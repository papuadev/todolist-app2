import { useEffect, useState } from "react";
import type { Todo, FilterType, SortOrder } from "../types/todo";
import { todoApi } from "../services/todoApi";
import { useDebounce } from "use-debounce";

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [debouncedSearch] = useDebounce(searchQuery, 400);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const data = await todoApi.getAll(debouncedSearch);
        setTodos(data);
      } catch (err) {
        setError("Gagal memuat todos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [debouncedSearch]);

  async function addTodo(text: string): Promise<void> {
    try {
      const newTodo = await todoApi.create(text);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError("Gagal menambah todo");
      console.error(err);
    }
  }

  async function toggleTodo(id: string): Promise<void> {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    try {
      const updated = await todoApi.update(id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      setError("Gagal mengupdate todo");
      console.error(err);
    }
  }

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
    .sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
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
    isLoading,
    error,
  };
}
