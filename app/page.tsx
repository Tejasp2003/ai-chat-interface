import { SearchInput } from "./components/SearchInput";
import { SuggestedTopics } from "./components/SuggestedTopics";

export default function Home() {
  return (
    <main className=" w-full flex justify-center items-center flex-col min-h-screen bg-[#27374D]">
      <div
        className="flex flex-col items-center justify-start p-4
       w-[90vw] h-[90vh] grainy rounded-xl
      "
      >
        <h1 className="text-3xl text-[#102C57] font-bold mb-4">
          AI Q&A Interface
        </h1>
        <SearchInput />
        <SuggestedTopics />
      </div>
    </main>
  );
}
