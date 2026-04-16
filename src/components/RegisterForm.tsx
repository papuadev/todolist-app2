import { withFormik, Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikProps } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

// const getData = async () => {
//   try {
//     const res = await fetch(
//       "https://moraldoctor-us.backendless.app/api/data/user-auth",
//     );
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
});

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  //   useEffect(() => {
  //     getData();
  //   }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
      <h2 className="text-xl font-medium text-gray-900">Register</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const res = await fetch(
              "https://moraldoctor-us.backendless.app/api/data/user-auth",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              },
            );
            if (res.ok) {
              alert("Registration successful! Please login.");
              resetForm();
              onSwitch();
            }
          } catch (error) {
            console.log(error);
            alert("Registration failed. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>

            <Field
              name="username"
              type="text"
              placeholder="Masukkan username"
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg 
               focus:outline-none focus:border-gray-400 focus:bg-white 
               transition-colors placeholder:text-gray-400"
            />

            <ErrorMessage
              name="username"
              component="div"
              className="text-xs text-red-500 font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>

            <Field
              name="email"
              type="email"
              placeholder="Masukkan email"
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg 
               focus:outline-none focus:border-gray-400 focus:bg-white 
               transition-colors placeholder:text-gray-400"
            />

            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-500 font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <Field
              name="password"
              type="password"
              placeholder="Masukkan password"
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg 
               focus:outline-none focus:border-gray-400 focus:bg-white 
               transition-colors placeholder:text-gray-400"
            />

            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded-lg"
          >
            Daftar
          </button>
        </Form>
      </Formik>

      <p className="text-sm text-center text-gray-600 mt-2">
        Sudah punya akun?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium"
        >
          Login di sini
        </button>
      </p>
    </div>
  );
}
