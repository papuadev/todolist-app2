import { useEffect, useState } from "react";
import type { Todo, FilterType, SortOrder } from "../types/todo";
import { todoApi } from "../services/todoApi";

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ✅ Tambah state untuk loading & error
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load todos dari API saat pertama mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const data = await todoApi.getAll();
        setTodos(data);
      } catch (err) {
        setError("Gagal memuat todos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []); // Hanya sekali saat mount

  // ✅ addTodo: POST ke API
  async function addTodo(text: string): Promise<void> {
    try {
      const newTodo = await todoApi.create(text);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError("Gagal menambah todo");
      console.error(err);
    }
  }

  // ✅ toggleTodo: PUT ke API
  async function toggleTodo(id: string): Promise<void> {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    try {
      const updated = await todoApi.update(id, { completed: !todo.completed });
      setTodos(todos.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      setError("Gagal mengupdate todo");
      console.error(err);
    }
  }

  // ✅ deleteTodo: DELETE ke API
  async function deleteTodo(id: string): Promise<void> {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter((item) => item.id !== id));
    } catch (err) {
      setError("Gagal menghapus todo");
      console.error(err);
    }
  }

  const displayTodos = todos
    .filter((item) => {
      if (filter === "active") return !item.completed;
      if (filter === "completed") return item.completed;
      return true;
    })
    .filter((item) =>
      item.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
    )
    .sort((a, b) => {
      return sortOrder === "newest"
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt;
    });

  const toggleSortOrder = (): void => {
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    toggleSortOrder,
    sortOrder,
    setSortOrder,
    displayTodos,
    searchQuery,
    setSearchQuery,
    isLoading, // ✅ expose ke komponen
    error, // ✅ expose ke komponen
  };
}
