"use client";
import { signInWithRedirect } from "aws-amplify/auth";

export default function LoginPage() {
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signInWithRedirect();
    } catch (error: any) {
      alert("Lỗi khi đăng nhập: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng nhập Quản trị</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <p className="text-sm text-gray-600 mb-6">Bạn đang truy cập vào hệ thống quản lý Gỗ Trường Phát.</p>
          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Đăng nhập qua hệ thống
          </button>
        </div>
      </div>
    </div>
  );
}
