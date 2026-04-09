import { useState } from "react";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(loginValue, password);
      navigate("/");
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Вход в профиль</title>
        <meta
          name="description"
          content="Войдите в ваш профиль, чтобы получить доступ к возможности покупки товаров и поддержки приютов."
        />
        <link rel="canonical" href="http://localhost:5173/login" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-[#A0937D] rounded-3xl p-8 w-[600px]">
          <h1 className="text-center text-lg font-semibold text-[#EDE6DB] mb-6">
            Рады помогать с Вами снова!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#EDE6DB]">Логин</label>
              <input
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EFE9DD]"
              />
            </div>

            <div>
              <label className="text-sm text-[#EDE6DB]">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full mt-4 bg-[#574C3A] text-[#EDE6DB] py-2 rounded-lg hover:opacity-90 transition"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
