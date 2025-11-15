import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";

type Product = {
  id: number;
  name: string;
  vendor: string;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/d31497b627cfa44bc6b2283d2b27e116.jpg",
  },
];

export function Profile() {
  function saveNewProfileButton(isChangedInfo: boolean) {
    return isChangedInfo ? (
      <button className="bg-[#574C3A] text-[#EDE6DB] rounded-[15px] px-4 py-1 w-full mt-4">
        Сохранить
      </button>
    ) : (
      <></>
    );
  }

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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {products.map(({ id, name, vendor, price, imageUrl }) => (
            <ProductMiniature
              id={id}
              name={name}
              vendor={vendor}
              price={price}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
