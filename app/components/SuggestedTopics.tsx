"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBrain } from "react-icons/fa";

const topics = [
  "Let's Learn Quantum Physics ⚡",
  "Quantum Entanglement 🤝",
  "The Uncertainty Principle 📉",
  "The Schrödinger's Cat Paradox 🐈",
  "The Many-Worlds Interpretation 🌍",
];

export function SuggestedTopics() {
  const router = useRouter();

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    console.log(selectedTopic);
    router.push(`/answer?q=${topic}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[100%] md:w-[80%] p-4 bg-[#102C57] rounded-xl max-h-[80%] overflow-y-auto">
      <h2 className="text-xl font-semibold m-4">Or Try These Topics💡:</h2>
      <ul className="min-w-[80%] space-y-3 text-black m-4 overflow-y-auto ">
        {topics.map((topic, index) => (
          <motion.li
            key={topic}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className=" p-2 grainy  text-center rounded-xl font-semibold w-full cursor-pointer border-2 border-[#27374D] flex space-x-4 items-center flex-row"
            onClick={() => handleTopicClick(topic)}
          >
            <div className="flex flex-row items-center justify-center">
              <FaBrain className="h-10 w-10 text-[#27374D] " />
            </div>

            <span className="text-lg">{topic}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
