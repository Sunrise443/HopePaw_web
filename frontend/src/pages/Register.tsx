import pic5 from "../assets/image 7.png";
import { Header } from "../components/Header";

export function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={false} />

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
                src={pic5}
                alt="Illustration"
                className="max-h-[420px] object-contain"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-[#A0937D] rounded-3xl p-8 w-full max-w-[500px]">
              <h2 className="text-center text-lg font-semibold text-[#EDE6DB] mb-6">
                Давайте помогать!
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="text-sm text-[#EDE6DB]">Логин</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#EDE6DB]">Пароль</label>
                  <input
                    type="password"
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#EDE6DB]">Город</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#EDE6DB]">Эл. почта</label>
                  <input
                    type="email"
                    className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
                  />
                </div>

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
