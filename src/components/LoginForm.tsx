import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Ambil state & actions dari store — hanya subscribe ke yang dibutuhkan
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  async function handleSubmit() {
    if (!username.trim() || !password.trim()) return;
    await login(username, password);
  }

  return (
    <div>
      <h2>Login</h2>

      {/* Tampilkan error jika ada */}
      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={clearError}>Tutup</button>
        </div>
      )}

      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          placeholder="Masukkan username"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Masukkan password"
        />
      </div>

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>

      <p>
        Demo — username: <code>admin</code>, password: <code>admin123</code>
      </p>
    </div>
  );
}
