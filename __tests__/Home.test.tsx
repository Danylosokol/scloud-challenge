import {render, screen, waitFor, act} from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it('should have "Welcome to ScreenCloud ATM!" text', () => {
    render(<Home />);

    const myElem = screen.getByText("Welcome to ScreenCloud ATM!");

    expect(myElem).toBeInTheDocument();
  });

  it('After clicking on the card, we are getting screen to enter PIN', async () => {
    render(<Home />);

    const cardElement = screen.getByText("Michal");
    act(() => {
      cardElement.click();
    });
    await waitFor(() => {
      expect(screen.getByText("Please enter your PIN:")).toBeInTheDocument();
    })

    expect(cardElement).toBeInTheDocument();
  });
});