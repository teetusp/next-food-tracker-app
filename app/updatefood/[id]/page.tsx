"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const id = useParams().id;

  const [foodname, setFoodName] = useState<string>("");
  const [mealtype, setMealType] = useState<string>("");
  const [selecteddate, setSelectedDate] = useState<string>("");
  const [food_image_file, setFoodImageFile] = useState<File | null>(null);
  const [foodimagePreviewUrl, setFoodImagePreviewUrl] = useState<string | null>(
    null
  );
  const [old_image_file, setOldImageFile] = useState<string | null>(null);

  //ดึงข้อมูลจาก supabase มาแสดงหน้าจอตาม id ที่ได้มาจาก url
  useEffect(() => {
    //ดึงข้อมูลจาก supabase
    async function fetchData() {
      const { data, error } = await supabase
        .from("food_tb")
        .select("*")
        .eq("food_id", id)
        .single();

      if (error) {
        alert("พบข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง...");
        console.log(error);
        return;
      }
      //เอาข้อมูลที่ดึงมาจาก supabase มาแสดงบนหน้าจอ
      setFoodName(data.foodname);
      setMealType(data.meal);
      setSelectedDate(data.fooddate_at);
      setFoodImagePreviewUrl(data.food_image_url);
    }

    fetchData();
  }, []);

  //ฟังก์ชันเลือกรูปภาพเพื่อพรีวิวก่อนที่จะอัปโหลด
  function handleSelectImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;

    setFoodImageFile(file);

    if (file) {
      setFoodImagePreviewUrl(URL.createObjectURL(file as Blob));
    }
  }

  async function handleUploadAndUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //สร้างตัวแปรเพื่อเก็บ url ของรูปภาพที่อัปโหลด เพื่อจะเอาไปบันทึกตาราง
    let image_url = foodimagePreviewUrl || "";

    //ตรวจสอบว่ามีการเลือกรูปภาพเพื่อที่จะอัปโหลดหรือไม่
    if (food_image_file) {
      //ลบรูปภาพเก่าออกใน supabase เพื่ออัปโหลดรูปใหม่
      if (old_image_file != "") {
        //เอาเฉพาะชื่อของรูปภาพจาก image_url
        const image_name = image_url.split("/").pop() as string;
        const { data, error } = await supabase.storage
          .from("food_bk")
          .remove([image_name]);

        if (error) {
          alert("พบข้อผิดพลาดในการลบรูปภาพ กรุณาลองใหม่อีกครั้ง...");
          console.log(error);
          return;
        }
      }

      //กรณีมีการเลือกรูป ก็จะทำการอัปโหลดรูปไปยัง storage ของ supabase
      const new_image_flie_name = `${Date.now()}-${food_image_file?.name}`;
      //อัปโหลดรูป
      const { data, error } = await supabase.storage
        .from("food_bk")
        .upload(new_image_flie_name, food_image_file);

      if (error) {
        alert("พบข้อผิดพลาดในการอัปโหลดรูปภาพ กรุณาลองใหม่อีกครั้ง");
        console.log(error.message);
        return;
      } else {
        // get url ของรูปที่
        const { data } = supabase.storage
          .from("food_bk")
          .getPublicUrl(new_image_flie_name);
        image_url = data.publicUrl;
      }
    }

    //---------แก้ไขลงตาราง supabase---------
    const { data, error } = await supabase
      .from("food_tb")
      .update({
        foodname: foodname,
        meal: mealtype,
        fooddate_at: selecteddate,
        food_image_url: image_url,
        update_at: new Date().toISOString(),
      })
      .eq("food_id", id);

    //ตรวจสอบ
    if (error) {
      alert("พบข้อผิดพลาดในการแก้ไขข้อมูล กรุณาลองใหม่อีกครั้ง");
      console.log(error.message);
      return;
    } else {
      alert("บันทึกข้อมูลเรียบร้อย");
      //เคลียร์ข้อมูล

      //redirect กลับไปหน้า แสดงงานทั้งหมด
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-green-500 p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          แก้ไขอาหาร
        </h1>
        <p className="text-center text-gray-500 mb-6">
          กรอกรายละเอียดอาหารที่คุณต้องการแก้ไข
        </p>

        <form onSubmit={handleUploadAndUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="foodname"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่ออาหาร
            </label>
            <input
              type="text"
              id="foodname"
              value={foodname}
              onChange={(e) => setFoodName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="mealType"
              className="block text-sm font-medium text-gray-700"
            >
              เลือกมื้ออาหาร
            </label>
            <select
              id="mealType"
              value={mealtype}
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
            <label
              htmlFor="selectedDate"
              className="block text-sm font-medium text-gray-700"
            >
              เลือกวันเดือนปี
            </label>
            <input
              type="date"
              id="selectedDate"
              value={selecteddate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              รูปอาหาร
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                id="foodImage"
                className="hidden"
                onChange={handleSelectImagePreview}
                accept="image/*"
              />
              <label
                htmlFor="foodImage"
                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
              >
                เลือกรูปภาพ
              </label>
              {foodimagePreviewUrl && (
                <img
                  src={foodimagePreviewUrl}
                  alt="preview"
                  className="w-24 h-24 rounded-lg object-cover border-2 border-green-500"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              ย้อนกลับ
            </Link>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors duration-300"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
