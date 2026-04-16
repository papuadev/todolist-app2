import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
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

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

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

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const success = await login(values.username, values.password);
            if (success) {
              alert("Login successful!");
            }
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500">Username</label>
              <Field
                name="username"
                type="text"
                placeholder="Masukkan username"
                className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 disabled:opacity-50 transition-colors"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Masukkan password"
                className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 disabled:opacity-50 transition-colors"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Submit
            </button>
          </Form>
        </Formik>

        <p className="text-sm text-center text-gray-600 mt-2">
          Belum punya akun?{" "}
          <button
            onClick={onSwitch}
            className="text-blue-600 hover:underline font-medium"
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
}
