import { useState } from "react";
import type { TodoInputProps } from "../types/todo";

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState<string>("");

  function handleSubmit(): void {
    const trimText = text.trim();
    if (trimText !== "") {
      onAdd(trimText);
      setText("");
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Tambah task baru"
        className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
      >
        + Tambah
      </button>
    </div>
  );
}
