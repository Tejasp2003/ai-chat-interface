"use client";
import { useEffect, useState } from "react";
import {
  Message,
  continueConversation,
} from "../actions/actions";
import { readStreamableValue } from "ai/rsc";
import { useSearchParams } from "next/navigation";

import Conversation from "../components/Conversation";

export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const query = searchParams?.get("q");

  const fetchInitialConversation = async () => {
    setIsLoading(true);
    setConversation([{ role: "user", content: query as string }]);

    const { messages, newMessage } = await continueConversation([
      { role: "user", content: query as string },
    ]);
    setConversation(messages);
    let textContent = "";

    for await (const delta of readStreamableValue(newMessage)) {
      textContent += delta;

      setConversation((prev) => {
        const lastMessage = prev[prev.length - 1];
        setIsLoading(false);
        if (lastMessage && lastMessage.role === "assistant") {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, content: textContent },
          ];
        } else {
          return [...prev, { role: "assistant", content: textContent }];
        }
      });
    }
  };

  useEffect(() => {
    if (query) {
      fetchInitialConversation();
    }
  }, [query]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedConversation = [
      ...conversation,
      { role: "user", content: input },
    ];
    setConversation(updatedConversation as any);

    setInput("");
    const { messages, newMessage } = await continueConversation([
      ...conversation,
      { role: "user", content: input },
    ]);
    let textContent = "";
    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;

      setConversation([
        ...messages,
        { role: "assistant", content: textContent },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="grainy text-[#102C57] flex flex-col items-center justify-start p-2 min-h-screen">
      <h2 className="text-2xl font-semibold p-4">Ask Your Question 🤖</h2>
      <hr className="w-full h-[2px] bg-gray-300 mb-2" />

      <Conversation
        conversation={conversation}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}
