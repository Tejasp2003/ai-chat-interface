"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/answer?q=${encodeURIComponent(query)}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mb-4 w-[80%]"
    >
      <div className="flex flex-row items-center justify-center space-x-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full p-3 border  rounded-xl
           text-[#102C57] outline-[#102C57]
          placeholder:text-[#102C57] placeholder:font-semibold
        
        "
        />
        <button
          type="submit"
          className=" p-3 bg-[#102C57] text-white rounded-lg"
        >
          Search
        </button>
      </div>
    </motion.form>
  );
}
