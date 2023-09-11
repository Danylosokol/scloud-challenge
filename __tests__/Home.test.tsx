import {render, screen, waitFor, act} from "@testing-library/react";
import Home from "@/app/page";

describe("Critical Path Testing", () => {
  it('Should have "Welcome to ScreenCloud ATM!" text', () => {
    render(<Home />);

    const myElem = screen.getByText("Welcome to ScreenCloud ATM!");

    expect(myElem).toBeInTheDocument();
  });

  it("After clicking on the card, we are getting screen to enter PIN", async () => {
    render(<Home />);

    const cardElement = screen.getByText("Michal");
    act(() => {
      cardElement.click();
    });
    await waitFor(() => {
      expect(screen.getByText("Please enter your PIN:")).toBeInTheDocument();
    });

    expect(cardElement).toBeInTheDocument();
  });

  it("Should show an error message when a wrong PIN is entered", async () => {
    render(<Home/>);
    act(() => {
      screen.getByText("Michal").click();
      screen.getByText("1").click();
      screen.getByText("2").click();
      screen.getByText("3").click();
      screen.getByText("4").click();
      screen.getByTestId("button-right").click();
    });

  });
});