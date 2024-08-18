import React, { useEffect, useRef } from "react";
import { Message } from "../actions/actions";
import ReactMarkdown from "react-markdown";
import { FaRobot, FaUser, FaCopy } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { LoadingAnimation } from "./LoadingAnimation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface ConversationProps {
  conversation: Message[];
  input: string;
  setInput: (input: string) => void;
  handleSend: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const Conversation = ({
  conversation,
  isLoading,
  input,
  setInput,
  handleSend,
}: ConversationProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  const handleCopy = (content: string) => {
    copy(content);
    toast.success("Message copied to clipboard! 🎉");
  };

  return (
    <div className="flex flex-col items-start justify-end p-4 bg-[#102C57] w-full rounded-xl h-[88vh] overflow-y-auto">
      <div className="w-full overflow-auto">
        <AnimatePresence>
          {conversation.map((message, index) => (
            <motion.div
              key={index}
              initial={
                message.role === "assistant"
                  ? { opacity: 0, y: 20 }
                  : { opacity: 1 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-4 m-2 flex items-start lg:max-w-[75%] ${
                message.role === "user"
                  ? "flex-row-reverse items-center gap-4 lg:ml-auto"
                  : "items-start justify-center space-x-4"
              } rounded-lg ${
                message.role === "user"
                  ? "bg-[#F0F3F4] md:w-fit w-full"
                  : "bg-[#F7E7DC] lg:w-fit w-full lg:max-w-[65%]"
              }`}
            >
              <span className="text-2xl text-black">
                {message.role === "assistant" ? (
                  <FaRobot className="h-8 w-8" />
                ) : (
                  <FaUser />
                )}
              </span>
              <div className="flex-1 flex flex-row items-start">
                <div
                  className={`text-[18px] font-semibold ${
                    message.role === "assistant"
                      ? "text-[#102C57]"
                      : "text-black"
                  } whitespace-pre-wrap`}
                >
                    
                  {index === conversation.length - 1 && isLoading 
                  && message.role === "assistant"
                  ? (
                    <LoadingAnimation />
                  ) : (
                   <ReactMarkdown>{message.content}</ReactMarkdown>
                  )}
                </div>
                {message.role === "assistant" && (
                  <button
                    onClick={() => handleCopy(message.content)}
                    className="text-[#102C57] flex items-center justify-center hover:text-gray-300 ml-2 mt-1"
                  >
                    <FaCopy />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
       
      </div>

      <form
        onSubmit={handleSend}
        className="w-[80%] flex flex-row items-center justify-center space-x-3 mx-auto mt-4"
      >
        <div className="flex flex-row items-center justify-center space-x-3 w-full mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full p-3 border rounded-xl text-[#102C57] outline-[#102C57] placeholder:text-[#102C57] placeholder:font-semibold"
          />
          <button
            type="submit"
            className="p-3 bg-[#F0F3FF] text-[#000000] font-extrabold text-lg rounded-lg hover:bg-[#dce2fa]"
          >
            Search
          </button>
        </div>
      </form>
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Conversation;
