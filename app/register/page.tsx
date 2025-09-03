"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // ฟังก์ชันจัดการการอัปโหลดรูปภาพ
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setImagePreviewUrl(fileUrl);
    }
  };

  // ฟังก์ชันจัดการการลงทะเบียน
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      fullName,
      email,
      password,
      gender,
      imageFile,
    });
    // เพิ่มโค้ดสำหรับส่งข้อมูลไปยังเซิร์ฟเวอร์ที่นี่
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          สร้างบัญชีใหม่
        </h1>
        <p className="text-center text-gray-500 mb-6">
          กรอกข้อมูลเพื่อลงทะเบียน
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อ-สกุล
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

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

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              เพศ
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">กรุณาเลือกเพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="other">อื่นๆ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              รูปโปรไฟล์
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                id="profileImage"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <label
                htmlFor="profileImage"
                className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
              >
                เลือกรูปภาพ
              </label>
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-300"
          >
            ลงทะเบียน
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            มีบัญชีอยู่แล้ว?{" "}
            {/* Note: In a Next.js project, you would use <Link href="/login"> and omit the 'a' tag. */}
            <Link
              href="/login"
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
            >
              เข้าสู่ระบบที่นี่
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
