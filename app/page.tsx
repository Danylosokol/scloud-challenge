import ATM from "./components/ATM";
import { ATMProvider } from "./context/ATMProvider";
import { PinProvider } from "./context/PinProvider";
import { MessageProvider } from "./context/MessageProvider";
import { ScreenProvider } from "./context/ScreenProvider";
import { CustomerProvider } from "./context/CustomerProvider";

export default function Home() {
  return (
    <main className="bg-gradient-to-bl from-gray-100 to-gray-300 flex justify-center items-center min-h-[100vh] pt-5 pb-1">
      <ATMProvider>
        <MessageProvider>
          <PinProvider>
            <ScreenProvider>
              <CustomerProvider>
                <ATM />
              </CustomerProvider>
            </ScreenProvider>
          </PinProvider>
        </MessageProvider>
      </ATMProvider>
    </main>
  );
}
