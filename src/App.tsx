import AuthPage from "./components/AuthPage";
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
    displayTodos,
    searchQuery,
    setSearchQuery,
  } = useTodo();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!isAuthenticated) return <AuthPage />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-900">Todo App</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Halo,{" "}
              <span className="font-medium text-gray-800">
                {user?.username}
              </span>
              !
            </span>
            <button
              onClick={logout}
              className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Input + Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
          <TodoInput onAdd={addTodo} />
          <input
            type="text"
            placeholder="Cari task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors capitalize ${
                  filter === f
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 hover:bg-gray-100 text-gray-600"
                }`}
              >
                {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
              </button>
            ))}
          </div>
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
          >
            ↕ {sortOrder === "newest" ? "Newest" : "Oldest"}
          </button>
        </div>

        <p className="text-xs text-gray-400">{todos.length} task</p>

        {/* Todo List */}
        <div className="flex flex-col gap-2">
          {displayTodos.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 transition-opacity ${
                item.completed ? "opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodo(item.id)}
                className="mt-0.5 flex-shrink-0 cursor-pointer accent-gray-900"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${item.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                >
                  {item.text}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(item.createdAt).toLocaleString("id-ID")}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                  item.completed
                    ? "bg-green-50 text-green-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {item.completed ? "Selesai" : "Aktif"}
              </span>
              <button
                onClick={() => deleteTodo(item.id)}
                className="text-xs px-2 py-1 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
