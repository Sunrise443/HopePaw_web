import { Link } from "react-router-dom";
import dogImage from "@/assets/dog403.jpg";

export function Error403Page() {
  return (
    <div className="min-h-screen bg-[#EDE6DB] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-[12rem] font-bold text-[#574C3A] leading-none mb-4">
          403
        </h1>

        <p className="text-xl text-[#A0937D] mb-8">
          У вас нет прав для доступа к этой странице
        </p>

        <img
          src={dogImage}
          className="w-56 h-56 object-cover rounded-full mx-auto mb-8 shadow-lg"
        />

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#574C3A] text-[#EDE6DB] rounded-lg hover:bg-[#6B5F4A] transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
