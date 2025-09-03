'use client';
import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';

export default function Page() {
  const [foodName, setFoodName] = useState<string>('ผัดกะเพรา'); // ค่าเริ่มต้นสำหรับหน้าแก้ไข
  const [email, setEmail] = useState<string>('user@example.com'); // ค่าเริ่มต้น
  const [mealType, setMealType] = useState<string>('lunch'); // ค่าเริ่มต้น
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-27'); // ค่าเริ่มต้น
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>('https://placehold.co/96x96/D1FAE5/065F46?text=เดิม'); // ตัวอย่างรูปภาพเดิม

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
      foodName,
      email,
      mealType,
      selectedDate,
      imageFile,
    });
    // เพิ่มโค้ดสำหรับส่งข้อมูลที่แก้ไขไปยังเซิร์ฟเวอร์ที่นี่
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-green-500 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">แก้ไขอาหาร</h1>
        <p className="text-center text-gray-500 mb-6">กรอกรายละเอียดอาหารที่คุณต้องการแก้ไข</p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="foodName" className="block text-sm font-medium text-gray-700">ชื่ออาหาร</label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="mealType" className="block text-sm font-medium text-gray-700">เลือกมื้ออาหาร</label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">เลือกมื้ออาหาร</option>
              <option value="breakfast">เช้า</option>
              <option value="lunch">กลางวัน</option>
              <option value="dinner">เย็น</option>
              <option value="snack">ว่าง</option>
            </select>
          </div>

          <div>
            <label htmlFor="selectedDate" className="block text-sm font-medium text-gray-700">เลือกวันเดือนปี</label>
            <input
              type="date"
              id="selectedDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">รูปอาหาร</label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                id="foodImage"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <label
                htmlFor="foodImage"
                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
              >
                เลือกรูปภาพ
              </label>
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Food Preview"
                  className="w-24 h-24 rounded-lg object-cover border-2 border-green-500"
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
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors duration-300"
            >
              บันทึกการแก้ไข
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
