import React from "react";
import foodTracker from "././images/foodtracker.jpg"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 font-sans text-white">
      {/* Main heading for the homepage */}
      <h1 className="text-center text-5xl font-extrabold mb-8 drop-shadow-lg">
        ยินดีต้อนรับสู่ Food Tracker
      </h1>
      
      {/* Image representing the application */}
      <div className="relative mb-8 max-w-sm overflow-hidden rounded-3xl shadow-2xl">
        <Image
          src={foodTracker}
          alt="ภาพอาหารหลากหลายชนิด"
          width={350}
          height={350}
          className="rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105"
        />
        {/* Decorative ring on the image */}
        <div className="absolute inset-0 rounded-3xl ring-4 ring-white ring-opacity-30"></div>
      </div>

      {/* Button group for navigation */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Login button */}
        <Link href="/login" className="w-full sm:w-auto transform rounded-full bg-gray-800 px-8 py-4 text-center font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-700">
          Login
        </Link>
        {/* Register button */}
        <Link href="/register" className="w-full sm:w-auto transform rounded-full bg-white px-8 py-4 text-center font-bold text-gray-800 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-200">
          Register
        </Link>
        
      </div>
    </div>
  );
}