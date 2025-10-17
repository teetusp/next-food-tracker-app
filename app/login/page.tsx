"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("user_tb")
      .select(
        "*"
      )
      .eq("email", email)
      .eq("password", password
     );

    if (error) {
      alert("พบข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง");
      console.log(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          เข้าสู่ระบบ
        </h1>
        <p className="text-center text-gray-500 mb-6">
          กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              id= "password"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            ยังไม่มีบัญชี?{" "}
            {/* Note: In a Next.js project, you would use <Link href="/register"> and omit the 'a' tag. */}
            <Link
              href="/register"
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
            >
              ลงทะเบียนที่นี่
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
