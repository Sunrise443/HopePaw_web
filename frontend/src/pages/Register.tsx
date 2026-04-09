import { useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/user.ts";
import pic5 from "../assets/image 7.png";
import { Helmet } from "react-helmet-async";
export function Register() {
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser({
        login: loginValue,
        password,
        email,
        city,
      });

      navigate("/login");
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 400) {
        setError("Пользователь с таким логином или email уже существует");
      } else {
        setError("Ошибка регистрации");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Регистрация</title>
        <meta
          name="description"
          content="Зарегистрируйтесь, чтобы получить доступ к своему профилю и истории покупок товаров для животных"
        />
        <link rel="canonical" href="http://localhost:5173/" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-24 mb-16">
            <div className="bg-[#A0937D] text-[#EDE6DB] rounded-3xl p-8 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">HopePaw</h2>
              <p className="text-sm leading-relaxed">
                Мы предлагаем товары для домашних животных от наших партнеров и
                помогаем тем, у кого пока нет семьи.
                <br />
                <br />
                Часть средств с каждой покупки направляется в приюты для
                животных — Вы сами можете выбрать организацию, которую хотите
                поддержать.
                <br />
                <br />
                Покупая у нас, вы радуете своего питомца и помогаете другим
                животным получить шанс на заботу и дом.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                loading="lazy"
                src={pic5}
                alt="Иллюстация"
                className="max-h-[420px] object-contain"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-[#A0937D] rounded-3xl p-8 w-full max-w-[500px]">
              <h2 className="text-center text-lg font-semibold text-[#EDE6DB] mb-6">
                Регистрация
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-[#EDE6DB]">Логин</label>
                  <input
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#EDE6DB]">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#EDE6DB]">Город</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#EDE6DB]">Эл. почта</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full mt-4 bg-[#574C3A] text-[#EDE6DB] py-2 rounded-lg hover:opacity-90 transition"
                >
                  Зарегистрироваться
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
