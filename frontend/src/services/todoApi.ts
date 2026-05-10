import type { Todo } from "../types/todo";

const BASE_URL = "http://localhost:3000";

export const todoApi = {
  getAll: async (search?: string, sort?: string) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);

    const query = params.toString();
    const url = query ? `${BASE_URL}/todos?${query}` : `${BASE_URL}/todos`;

    const res = await fetch(url);
    return res.json();
  },
  create: async (text: string) => {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed: false }),
    });
    if (!res.ok) throw new Error("Gagal membuat todo");
    return res.json();
  },

  update: async (id: string, data: Partial<Todo>) => {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal mengupdate todo");
    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Gagal menghapus todo");
    return res.json();
  },
};
