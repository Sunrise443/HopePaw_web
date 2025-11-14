import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";

export function Profile() {
  const saveNewProfileButton = (isChangedInfo: boolean) => {
    return isChangedInfo ? (
      <button className="bg-[#574C3A] text-[#EDE6DB] rounded-[15px] px-4 py-1 w-full mt-4">
        Сохранить
      </button>
    ) : (
      <></>
    );
  };
  return (
    <div>
      <Header isLoggedIn />
      <div className="static m-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          <div className="bg-[#A0937D] p-6 rounded-[30px] shadow-md">
            <h2 className="text-xl font-bold text-[#574C3A] mb-4">
              Личные данные
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-24 text-sm text-[#EDE6DB] font-medium">
                  Логин
                </label>
                <input
                  type="text"
                  name="login"
                  className="flex-1 p-2 rounded-[15px] bg-[#EDE6DB]"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-sm text-[#EDE6DB] font-medium">
                  Город
                </label>
                <input
                  type="text"
                  name="city"
                  className="flex-1 p-2 rounded-[15px] bg-[#EDE6DB]"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-sm text-[#EDE6DB] font-medium">
                  Эл. почта
                </label>
                <input
                  type="email"
                  name="email"
                  className="flex-1 p-2 rounded-[15px] bg-[#EDE6DB]"
                />
              </div>
            </div>
            {saveNewProfileButton(true)}
          </div>

          <div className="flex flex-col items-center justify-center text-center text-[#574C3A]">
            <h2 className="text-xl font-semibold mb-2">
              Вы уже отправили приютам:
            </h2>
            <p className="text-3xl font-bold">2 601 руб.</p>
          </div>
        </div>
        <h1 className="text-[#574C3A] mb-4 ml-4">Покупки</h1>
        <div>
          <ProductMiniature
            id={1}
            name="SOMETHING FOR DOG"
            vendor="Silly DOgs"
            price={4000}
            imageUrl="../assets/d31497b627cfa44bc6b2283d2b27e116.jpg"
          />
        </div>
      </div>
    </div>
  );
}
