import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import Home from "@/app/page";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockImplementation(async () =>
  Promise.resolve({
    data: {
      currentBalance: 220,
    },
  })
);

describe("Critical Path Testing", () => {
  it('Should have "Welcome to ScreenCloud ATM!" text', () => {
    render(<Home />);

    const myElem = screen.getByText("Welcome to ScreenCloud ATM!");

    expect(myElem).toBeInTheDocument();
  });

  it("After clicking on the card, we are getting screen to enter PIN", () => {
    render(<Home />);

    const cardElement = screen.getByText("Michal");
    act(() => {
      cardElement.click();
    });
    expect(screen.getByText("Enter your PIN:")).toBeInTheDocument();
  });

  it("Should show an error message when a wrong PIN is entered", async () => {
    mockedAxios.post.mockImplementation(async () =>
      Promise.reject({ response: { status: 403 } })
    );

    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);

    const pinDigits = ["1", "2", "3", "4"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });

    const submitButton = screen.getByTestId("button-right");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText("Entered PIN is incorrect!")).toBeInTheDocument();
    });
  });

  it("Should show main menu after a correct PIN is entered", async () => {
    mockedAxios.post.mockImplementation(async () =>
      Promise.resolve({
        data: {
          currentBalance: 220,
        },
      })
    );

    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);

    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });

    const submitButton = screen.getByTestId("button-right");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const mainMenuText = await screen.findByText("Select an operation:");
    expect(mainMenuText).toBeInTheDocument();
  });

  it("Should show an insufficient funds message when trying to withdraw more than ATM has", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const insufficientFundsMessage = await screen.findByText(
      "Sorry, insufficient funds in the ATM to complete this withdrawal. Please enter a smaller amount."
    );
    expect(insufficientFundsMessage).toBeInTheDocument();
  });

  it("Should ask customer to change entered amount when ATM сan't provide it in available denominations (5, 10, 20)", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByTestId("button-right"));

    const insufficientFundsMessage = await screen.findByText(
      /^We can't provide the entered amount in available denominations\./
    );
    expect(insufficientFundsMessage).toBeInTheDocument();
  });

  it("Should warn the user when the current balance is exceeded and the remaining amount will be taken from overdraft.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const overdraftAlert = await screen.findByText(
      /^Your withdrawal will exceed your main balance\./
    );
    expect(overdraftAlert).toBeInTheDocument();
  });

  it("Should give next mix of notes: 2 × £5, 2 × £10, 1 × £20, when the user wants to withdraw £50.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const mixOfNotes = await screen.findByText(/^2 × £5, 2 × £10, 1 × £20/);
    expect(mixOfNotes).toBeInTheDocument();
  });

  it("Should give next mix of notes: 4 × £20, 4 × £5, 4 × £10, when the user wants to withdraw £140.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const mixOfNotes = await screen.findByText(/^4 × £20, 4 × £5, 4 × £10/);
    expect(mixOfNotes).toBeInTheDocument();
  });

  it("Should give next mix of notes: 3 × £20, 2 × £5, 2 × £10, when the user wants to withdraw £90.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("9"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const mixOfNotes = await screen.findByText(/^3 × £20, 2 × £5, 2 × £10/);
    expect(mixOfNotes).toBeInTheDocument();
  });

  it("Should allow to successfully withdraw £50.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const ConfirmButton = await screen.findByText("Confirm");
    fireEvent.click(ConfirmButton);

    const mixOfNotes = await screen.findByText("Transaction was successful!");
    expect(mixOfNotes).toBeInTheDocument();
  });

  it("Should allow to take money after successful withdrawal and then hide them on click.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const ConfirmButton = await screen.findByText("Confirm");
    fireEvent.click(ConfirmButton);
    // cash becomes visible
    const cashContainer = screen.getByTestId("cash");
    expect(cashContainer).toHaveClass("z-20");
    //click on cash
    const cash = await screen.findByText("£");
    fireEvent.click(cash);
    // cash have to disappear
    expect(cashContainer).toHaveClass("z-0");
  });

  it("Should return card after finishing session after withdrawal.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const ConfirmButton = await screen.findByText("Confirm");
    fireEvent.click(ConfirmButton);

    const EndSessionButton = await screen.findByText("End session");
    fireEvent.click(EndSessionButton);
    // card becomes visible
    const cardContainer = screen.getByTestId("card");
    expect(cardContainer).toHaveClass("z-30");
  });


  it("Should change current balance in the menu after a successfull withdrawal.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const withdrawalMenu = await screen.findByText("Withdrawal");
    fireEvent.click(withdrawalMenu);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByTestId("button-right"));

    const ConfirmButton = await screen.findByText("Confirm");
    fireEvent.click(ConfirmButton);

    const MenuButton = await screen.findByText("Menu");
    fireEvent.click(MenuButton);

    const newBalanceElement = screen.getByTestId("currentBalance");
    expect(newBalanceElement.textContent).toBe("170");
  });

  it("Should allow you to make 2 withdrawals in a row.", async () => {
    render(<Home />);

    const userElement = screen.getByText("Michal");
    fireEvent.click(userElement);
    const pinDigits = ["1", "1", "1", "1"];
    pinDigits.forEach((digit) => {
      const digitElement = screen.getByText(digit);
      fireEvent.click(digitElement);
    });
    fireEvent.click(screen.getByTestId("button-right"));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });
    const withdrawals = [["1", "4", "0"], ["9", "0"], ["5", "0"]];
    for(let i = 0; i < withdrawals.length; i++){
      const withdrawalMenu = await screen.findByText("Withdrawal");
      fireEvent.click(withdrawalMenu);

      for(let j in withdrawals[i]){
        fireEvent.click(screen.getByText(withdrawals[i][j]));
      }

      fireEvent.click(screen.getByTestId("button-right"));

      if(i > 0){
        const ProceedButton = await screen.findByText("Proceed");
        fireEvent.click(ProceedButton);
      }

      const ConfirmButton = await screen.findByText("Confirm");
      fireEvent.click(ConfirmButton);

      const MenuButton = await screen.findByText("Menu");
      fireEvent.click(MenuButton);
    }

    const newBalanceElement = screen.getByTestId("currentBalance");
    expect(newBalanceElement.textContent).toBe("0");
  });
});
