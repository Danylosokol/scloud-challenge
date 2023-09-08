import ATM from "./components/ATM";
import { IsOnProvider } from "./context/IsOnProvider";
import { PinProvider } from "./context/PinProvider";
import { MessageProvider } from "./context/MessageProvider";

export default function Home() {
  return (
    <main className="bg-primary-light flex justify-center items-end min-h-[100vh] pt-5 md:pt-10">
      <IsOnProvider>
        <MessageProvider>
          <PinProvider>
            <ATM />
          </PinProvider>
        </MessageProvider>
      </IsOnProvider>
    </main>
  );
}
