import ATM from "./components/ATM";
import { ATMProvider } from "./context/ATMProvider";
import { PinProvider } from "./context/PinProvider";
import { MessageProvider } from "./context/MessageProvider";
import { ScreenProvider } from "./context/ScreenProvider";
import { CustomerProvider } from "./context/CustomerProvider";

export default function Home() {
  return (
    <main className="bg-primary-light flex justify-center items-end min-h-[100vh] pt-5 md:pt-10">
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
