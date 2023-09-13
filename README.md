# SCloud Challenge

## Summary

1. [Project Overwie]()
2. [Installation Instructions]()
3. [User Manual]()
4. [Detailed Project Description]()

## Project Overwie

This project is a take-home coding challenges, the goal of which was to create a web application that would function as an ATM and meet the following requirements:

- Before a user can access ATM functionality, the user must first enter a PIN and then the application validates the PIN by making a request to the API. Valid PIN: 1111.
- When the PIN is correctly entered, the app from the API response retrieves the user's current balance, which is £220.
- The user also has a £100 overdraft available.
- ATM has the following notes: 4 x £5, 15 x £10, 7 x £20.
- The application allows the user to withdraw any amount that is within their current balance + overdraft.
- The app lets users know if they do go overdrawn
- The app always tries to give the user the same amount of all notes whenever possible.
- The app replaces any notes that have run out with existing ones, if possible.
- If the app cannot dispense the requested amount, it asks the user to enter another amount and notifies if the problem is that the user wants to withdraw more than the ATM has or there are no required notes to dispense the requested amount.

**The following technologies were used to create the application:**
- NextJS 13
- React.js
- TypeScript
- HTML / CSS / JavaScript
- TailwindCSS
- Jest
- React Testing Library

The application has been deployed on **Vercel** and can be used at this link: [scloud-challenge.vercel.app](https://scloud-challenge.vercel.app/)

The app has a responsive design and has been tested in the following browsers:
- Google Chrome 
- Safari
- Firefox
- Microsoft Edge

## Installation Instructions

1. First make sure you have Node.js and NPM installed (run `node -v` command in your terminal and you should get a Node.js version). You can install Node.js [here](https://nodejs.org/en/download).
2. Clone the repository of the project, running this command: `git clone https://github.com/Danylosokol/scloud-challenge.git`
3. Open the project (`cd scloud-challenge/`)
4. Install the project's dependencies: `npm i`
5. Run the following command to build the app: `npm run build`
6. To start the application locally, run this command: `npm run start`
7. To run the application in development mode, use this command: `npm run dev`
8. To run automated tests, use this command: `npm test`



## User Manual
When you open the app you will see a simple ATM that has a screen, a keyboard for entering numbers and for confirming actions, a card reader and cash dispenser. 

To start the ATM, click on the card.

ATM has the following screens:
- **Greeting Screen** - the first welcome screen. 

- **Pin From Screen** - screen where you can enter your PIN or by clicking on the "Finish session" button, end the session and return your card. You can use both your keyboard and the ATM keyboard to enter the PIN. To delete the entered character, press the red key. To submit PIN, press the green key.

- **Message Screen** - this screen shows messages to users that inform them of the following situations: the entered PIN is incorrect, the user is trying to withdraw a larger amount than the ATM currently has, the user is trying to withdraw a larger amount than their balance and available overdraft, or the user is trying to withdraw an amount that cannot be collected from the ATM's available notes.

- **Loading Screen** - this screen will be shown to the user while the application makes an API request to verify the PIN. In the future, this screen can be used in other parts of the application where it will do potentially time-consuming operations.

- **Menu Screen** - screen displays basic user information about the account, such as current balance and available overdraft. By clicking on the "Withdrawal" button you can go to the form to enter the amount you want to withdraw. Click on the "Finish session" button to end the session and return your card.

- **Withdrawal Form Screen** - screen for entering the amount the user wants to withdraw. You can use both your keyboard and the ATM keyboard to enter the amount. To delete the entered character, press the red key. To confirm the entered amount, press the green key.

- **Overdraft Alert Screen** - in case the users entered a withdrawal amount that exceeds their balance, but the remaining amount can be taken from the user's overdraft, the application will show this screen where it will warn the user how much will be withdrawn from their overdraft.

- **Withdrawal Confirmation Screen** - This screen will show the basic information about the transaction: how much the user will withdraw, how much and what notes the user will receive, the current balance of the user and the available overdraft. By clicking on the "Confirm" button the user will confirm the transaction and the money will be withdrawn. Clicking on the "Back" button will take the user to the Withdrawal Form Screen.

- **Withdrawal Result** - the application will show the transaction result and thank the user for using SCloud ATM.

Upon successful withdrawal, ATM will dispense a cache to the user, which can be collected by clicking on it.

## Detailed Project Description

### Project Structure

The description of the main directories, files, functions and test cases of the project.

- **/app** - source code of the application:
  - **/components** - React components used in the application.
  - **/context** - files that provide application wide state using React Context.
  - **/utils** - functions and constants that are reused in the project a lot. In this file (ATMLogic.ts) the code for calculating mix of notes for withdrawal is locate.
  - layout.tsx - file serves as the root layout component in a Next.js 13 application, where it sets global styles, configures metadata for the app, and incorporates a Google font ("Sora") into the layout.
  - page.tsx - file serves as the main entry point for the Next.js 13 application's home page. It wraps the ATM component with various context providers such as ATMProvider, PinProvider, MessageProvider, ScreenProvider, and CustomerProvider to manage the application's state and behavior.
- **/public** - folder is used to serve static assets like loading.gif and logo.png, making them directly accessible in the Next.js 13 application.
- **/types** - is used to define and export TypeScript types like NotesType, which helps in maintaining a consistent structure for notes across the application.

### Even Mix Of Notes Algorithm

Description of the algorithm to collect withdrawal amount with even mix of notes.

1. **Initial Collection:** `The brutAtmAlgo` function initially collects notes in descending order of their value to make up the withdrawal amount.

2. **Adding Missing Notes:** `addMissingNotes` adds the missing notes that were skipped in the brutATMAlgo function to the collection.

3. **Zero-Amount Filling:** `fillZeroAmountNotes` iteratively replaces available notes with zero-amount notes (added in `addMissingNotes`) to balance the distribution.

4. **Balancing Distribution:** `balanceDistribution` further iteratively balances the notes by swapping them for available notes, aiming for uniform distribution.

### Test cases

- **brutAtmAlgo tests:** - test function with different withdrawal amounts, such as 140, 143, 90, 50. In all cases, except 143, the function has to collect this amount from the available notes.

- **fillZeroAmountNotes tests:** - test whether function correctly replaces available notes with zero-amount notes. In scenarios with remaining amounts of 140, 90 and 50, the function should either replace available notes with the zero-amount notes or remove these zero-amount notes.

- **balanceDistribution tests:** test how the function balances note amounts when withdrawal totals are 140, 90, and 50. The function should try to evenly distribute the notes according to their availability. If balancing isn't possible, the original array should be returned.

- **Should have "Welcome to ScreenCloud ATM!" text:** ensures that the home screen displays the welcome message.

- **Should show form to enter PIN, after user has clicked on the card** tests that clicking on the user's card prompts the PIN entry screen.

- **Should show an error message when a wrong PIN is entered:** ensures an error message is displayed when a wrong PIN is entered and submitted.

- **Should show main menu after a correct PIN is entered:** verifies that the main menu is displayed after the correct PIN is entered.

- **Should show an insufficient funds message when trying to withdraw more than ATM has:** ensures an error message is displayed when the user tries to withdraw more funds than what the ATM contains.

- **Should ask customer to change entered amount when ATM can't provide it in available denominations (5, 10, 20):** tests that the user is prompted to change the withdrawal amount if the ATM cannot provide it in the available denominations.

- **Should warn the user when the current balance is exceeded and the remaining amount will be taken from overdraft:** ensures that the user is warned when they're about to exceed their current balance.

- **Should give next mix of notes: 2 × £5, 2 × £10, 1 × £20, when the user wants to withdraw £50:** validates that the ATM provides the correct mix of notes for a £50 withdrawal.

- **Should give next mix of notes: 4 × £20, 4 × £5, 4 × £10, when the user wants to withdraw £140:** validates that the ATM provides the correct mix of notes for a £140 withdrawal.

- **Should give next mix of notes: 3 × £20, 2 × £5, 2 × £10, when the user wants to withdraw £90:** validates that the ATM provides the correct mix of notes for a £90 withdrawal.

- **Should allow to successfully withdraw £50:** checks if the ATM allows a successful withdrawal of £50 and displays a success message.

- **Should allow to take money after successful withdrawal and then hide them on click:** validates that the ATM allows the user to see and then "take" the money after a successful withdrawal.

- **Should return card after finishing session after withdrawal:** ensures that the ATM returns the user's card after they finish a session clicking on the corresponding button on the final screen.

- **Should change current balance in the menu after a successful withdrawal:** verifies that the ATM updates the user's current balance in the main menu after a successful withdrawal.