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
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="Tambah task baru"
      />
    </div>
  );
}
