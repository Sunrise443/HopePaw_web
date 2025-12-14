import { Header } from "../components/Header";

export function Login() {
  return (
    <div>
      <Header isLoggedIn={false} />
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-[#A0937D] rounded-3xl p-8 w-[600px]">
          <h2 className="text-center text-lg font-semibold text-[#EDE6DB] mb-6">
            Рады помогать с Вами снова!
          </h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-[#EDE6DB]">Логин</label>
              <input
                type="text"
                className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EFE9DD] outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-[#EDE6DB]">Пароль</label>
              <input
                type="password"
                className="w-full mt-1 rounded-lg px-4 py-2 bg-[#EDE6DB] outline-none"
              />
            </div>

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
