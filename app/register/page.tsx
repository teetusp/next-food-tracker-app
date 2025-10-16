"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<boolean>(false);
  const [preview_file, setPreviewFile] = useState<string | null>(null);
  const [image_flie, setImageFile] = useState<File | null>(null);

  //ฟังก์ชันเลือกรูปภาพเพื่อพรีวิวก่อนที่จะอัปโหลด
  function handleSelectImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    setImageFile(file);

    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  }

  //ฟังก์ชันอัปโหลดรูปภาพ และบันทึกลงฐานข้อมูลที่ Supabase
  async function handleUploadAndSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    alert("อัปโหลดรูปภาพและบันทึกข้อมูล");

    let image_url = "";
    //ตรวจสอบว่ามีการเลือกรูปภาพเพื่อที่จะอัปโหลดหรือไม่
    if (image_flie) {
      const new_image_flie_name = `${Date.now()}-${image_flie?.name}`;
      //อัปโหลดรูป
      const { data, error } = await supabase.storage
        .from("user_bk")
        .upload(new_image_flie_name, image_flie);

      if (error) {
        alert("พบข้อผิดพลาดในการอัปโหลดรูปภาพ กรุณาลองใหม่อีกครั้ง");
        console.log(error.message);
        return;
      } else {
        // get url ของรูปที่
        const { data } = supabase.storage
          .from("user_bk")
          .getPublicUrl(new_image_flie_name);
        image_url = data.publicUrl;
      }
    }

    //--------บันทึกลงตาราง supabase---------
    const { data, error } = await supabase.from("user_tb").insert({
      fullname: fullname,
      email: email,
      password: password,
      gender: gender,
      user_image_url: image_url,
    });

    //ตรวจสอบการบันทึกข้อมูล
    if (error) {
      alert("พบข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง");
      console.log(error.message);
      return;
    } else {
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      //clear ข้อมูลในฟอร์ม
      setFullName("");
      setEmail("");
      setPassword("");
      setGender(false);
      setImageFile(null);
      setPreviewFile(null);
      //redirect กลับไปหน้า login
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          สร้างบัญชีใหม่
        </h1>
        <p className="text-center text-gray-500 mb-6">
          กรอกข้อมูลเพื่อลงทะเบียน
        </p>

        <form className="space-y-4" onSubmit={handleUploadAndSave}>
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
              value={fullname}
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
              value={gender ? "1" : "0"}
              onChange={(e) => setGender(e.target.value === "1")}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="0">ชาย</option>
              <option value="1">หญิง</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              รูปโปรไฟล์
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleSelectImagePreview}
                accept="image/*"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
              >
                เลือกรูปภาพ
              </label>
              {preview_file && (
                <img
                  src={preview_file}
                  alt="preview"
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
