"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Foods = {
  food_id: string;
  fooddate_at: string;
  food_image_url: string;
  foodname: string;
  meal: string;
};

export default function Page() {
  const [foods, setFoods] = useState<Foods[]>([]);

  //เมื่อเพจถูกโหลด ให้ดึงข้อมูลจาก supabase เพื่อมาแสดงผลที่หน้าเพจ
  useEffect(() => {
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("food_tb")
        .select(
          "food_id, foodname, meal, fooddate_at, food_image_url, created_at"
        )
        .order("created_at", { ascending: false });

      //หลังจากดึงข้อมูลมาตรวจสอบ error
      if (error) {
        alert("พบข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง...");
        console.log(error);
        return;
      }
      //ไม่พบ error
      if (data) {
        setFoods(data as Foods[]);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-teal-400 to-cyan-600">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
        {/* Header และปุ่ม Add Food */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left flex-grow">
            Dashboard
          </h1>
          <Link
            href="/profile"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors duration-300 w-full sm:w-auto text-center"
          >
            แก้ไข Profile
          </Link>
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
            value=""
            onChange={() => {}}
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  วันที่
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  รูปอาหาร
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ชื่ออาหาร
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  มื้ออาหาร
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  แก้ไข
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foods.map((item) => (
                <tr key={item.food_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.fooddate_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.food_image_url ? (
                      <img
                        src={item.food_image_url}
                        alt="food"
                        width={50}
                        height={50}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-indigo-500"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.foodname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.meal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link href={`/updatefood/${item.food_id}`}>แก้ไข</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
