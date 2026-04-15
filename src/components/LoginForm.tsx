import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  async function handleSubmit() {
    if (!username.trim() || !password.trim()) return;
    await login(username, password);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-medium text-gray-900">Login</h2>

        {error && (
          <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 ml-2 leading-none"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              placeholder="Masukkan username"
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 disabled:opacity-50 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Masukkan password"
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 disabled:opacity-50 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className="text-xs text-center text-gray-400">
          Demo — username:{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
            admin
          </code>
          , password:{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
            admin123
          </code>
        </p>
      </div>
    </div>
  );
}
