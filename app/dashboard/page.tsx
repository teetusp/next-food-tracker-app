'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';

// กำหนด interface สำหรับข้อมูลอาหาร
interface FoodItem {
  id: string;
  date: string;
  foodImageUrl: string;
  foodName: string;
  mealType: string;
}

// ข้อมูลอาหารจำลอง (Mock Data)
const MOCK_FOOD_DATA: FoodItem[] = [
  { id: '1', date: '2024-05-20', foodImageUrl: 'https://placehold.co/80x80/6EE7B7/065F46?text=ข้าว', foodName: 'ข้าวผัด', mealType: 'กลางวัน' },
  { id: '2', date: '2024-05-20', foodImageUrl: 'https://placehold.co/80x80/93C5FD/1E40AF?text=ต้ม', foodName: 'ต้มยำกุ้ง', mealType: 'เย็น' },
  { id: '3', date: '2024-05-19', foodImageUrl: 'https://placehold.co/80x80/FDBA74/9A3412?text=ไก่', foodName: 'ข้าวหมกไก่', mealType: 'กลางวัน' },
  { id: '4', date: '2024-05-19', foodImageUrl: 'https://placehold.co/80x80/A78BFA/4C1D95?text=หมู', foodName: 'แกงส้มหมู', mealType: 'เย็น' },
  { id: '5', date: '2024-05-18', foodImageUrl: 'https://placehold.co/80x80/FBCFE8/9D174D?text=สเต็ก', foodName: 'สเต็กเนื้อ', mealType: 'เย็น' },
  { id: '6', date: '2024-05-18', foodImageUrl: 'https://placehold.co/80x80/FECACA/991B1B?text=ผัก', foodName: 'สลัดผักรวม', mealType: 'กลางวัน' },
  { id: '7', date: '2024-05-17', foodImageUrl: 'https://placehold.co/80x80/FCE7F3/BE185D?text=กุ้ง', foodName: 'กุ้งแช่น้ำปลา', mealType: 'ว่าง' },
  { id: '8', date: '2024-05-17', foodImageUrl: 'https://placehold.co/80x80/D1D5DB/374151?text=พิซซ่า', foodName: 'พิซซ่าหน้าชีส', mealType: 'เย็น' },
  { id: '9', date: '2024-05-16', foodImageUrl: 'https://placehold.co/80x80/BFDBFE/1E3A8A?text=ไข่', foodName: 'ไข่เจียวหมูสับ', mealType: 'เช้า' },
  { id: '10', date: '2024-05-16', foodImageUrl: 'https://placehold.co/80x80/DBCFE8/6B21A8?text=น้ำ', foodName: 'น้ำเต้าหู้', mealType: 'เช้า' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredFoodData, setFilteredFoodData] = useState<FoodItem[]>(MOCK_FOOD_DATA);

  // ฟังก์ชันสำหรับค้นหาข้อมูลอาหาร
  useEffect(() => {
    const results = MOCK_FOOD_DATA.filter(food =>
      food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoodData(results);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-teal-400 to-cyan-600">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
        {/* Header และปุ่ม Add Food */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left flex-grow">
            Dashboard
          </h1>
          <Link
            href="/addfood"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors duration-300 w-full sm:w-auto text-center"
          >
            + เพิ่มอาหาร
          </Link>
        </div>

        {/* Search Bar และปุ่มค้นหา */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="ค้นหาชื่ออาหาร..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow px-4 py-2 bg-gray-100 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={() => {}}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-300 w-full sm:w-auto"
          >
            ค้นหา
          </button>
        </div>

        {/* ตารางแสดงข้อมูลอาหาร */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รูปอาหาร
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่ออาหาร
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  มื้ออาหาร
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  แก้ไข
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFoodData.length > 0 ? (
                filteredFoodData.map(food => (
                  <tr key={food.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{food.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={food.foodImageUrl} alt={food.foodName} className="w-12 h-12 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{food.foodName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{food.mealType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href={`/updatefood?id=${food.id}`} className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200">
                        แก้ไข
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    ไม่พบรายการอาหารที่คุณค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
