import { LoginForm } from "./components/LoginForm";
import { TodoInput } from "./components/TodoInput";
import { useTodo } from "./hooks/useTodo";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const {
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
  } = useTodo();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Jika belum login, tampilkan LoginForm
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <span>Halo, {user?.username}!</span>
        <button onClick={logout}>Logout</button>
      </div>
      <TodoInput onAdd={addTodo} />
      <input
        type="text"
        placeholder="Cari task"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <p>Jumlah task : {todos.length}</p>
      <div>
        <span> {sortOrder === "newest" ? "Newest" : "Oldest"}</span>
        <button onClick={toggleSortOrder}>Sort</button>
      </div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <hr />
      {displayTodos.map((item) => (
        <div>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTodo(item.id)}
          />
          <button onClick={() => deleteTodo(item.id)}>Hapus</button>

          <p>
            {item.text} - {item.completed ? "Selesai" : "Belum Selesai"} -
            CretedAt : {new Date(item.createdAt).toLocaleString()}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}
