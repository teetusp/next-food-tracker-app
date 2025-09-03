'use client';
import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';

// ตัวอย่างข้อมูลเริ่มต้นสำหรับหน้าแก้ไขโปรไฟล์
interface UserProfile {
  fullName: string;
  email: string;
  gender: string;
  profileImageUrl: string | null;
}

const initialProfile: UserProfile = {
  fullName: 'สมชาย รักดี',
  email: 'somchai.rakdee@example.com',
  gender: 'male',
  profileImageUrl: 'https://placehold.co/80x80/D1FAE5/065F46?text=รูปเดิม',
};

export default function Page() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [password, setPassword] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(initialProfile.profileImageUrl);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // ฟังก์ชันจัดการการอัปโหลดรูปภาพ
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setImagePreviewUrl(fileUrl);
    }
  };

  // ฟังก์ชันจัดการการบันทึกข้อมูลที่แก้ไข
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...profile,
      password: password,
      newImageFile: imageFile,
    });
    // เพิ่มโค้ดสำหรับส่งข้อมูลที่แก้ไขไปยังเซิร์ฟเวอร์ที่นี่
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">แก้ไขโปรไฟล์</h1>
        <p className="text-center text-gray-500 mb-6">แก้ไขข้อมูลส่วนตัวของคุณ</p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">ชื่อ-สกุล</label>
            <input
              type="text"
              id="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">รหัสผ่าน (กรอกเพื่อแก้ไข)</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">เพศ</label>
            <select
              id="gender"
              value={profile.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">เลือกเพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="other">อื่นๆ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">รูปโปรไฟล์</label>
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
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
                />
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Link href="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-300">
              ย้อนกลับ
            </Link>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors duration-300"
            >
              บันทึกการแก้ไข
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};