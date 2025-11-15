import { ActionButton } from "../components/ActionButtons";
import { Header } from "../components/Header";
import ProductBasketMiniature from "../components/ProductBasketMiniature";

type BusketItem = {
  id: number;
  name: string;
  vendor: string;
  price: number;
  imageUrl: string;
};

const basketItems: BusketItem[] = [
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/pic4.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/pic4.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/pic4.jpg",
  },
];

export default function Basket() {
  return (
    <div>
      <Header isLoggedIn />
      <h2 className="m-4 text-xl text-[#574C3A]">Корзина</h2>

      <div className="flex flex-col lg:flex-row justify-center gap-16 max-w-[90%] mx-auto px-4">
        <div className="grid gap-4 flex-1">
          {basketItems.map(({ id, name, vendor, price, imageUrl }) => (
            <ProductBasketMiniature
              id={id}
              name={name}
              vendor={vendor}
              price={price}
              imageUrl={imageUrl}
            />
          ))}
          <div className="flex items-center bg-[#A0937D] text-[#EDE6DB] rounded-xl gap-3 px-4 py-2">
            Дополнительная сумма пожертвований
            <input
              type="number"
              className="bg-[#EDE6DB] text-[#A0937D] ml-2 rounded-lg px-3 py-1 w-32 text-right outline-none"
            />
            руб.
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <form className="bg-[#A0937D] rounded-2xl p-3 flex flex-col gap-4">
            <input
              className="rounded-xl py-2 px-4 text-[#A0937D] bg-[#EDE6DB] placeholder-[#84795F] outline-none"
              placeholder="Адрес доставки"
            />
            <input
              className="rounded-xl py-2 px-4 text-[#A0937D] bg-[#EDE6DB] placeholder-[#84795F] outline-none"
              placeholder="Тип доставки"
            />
            <div className="flex justify-between text-[#EDE6DB] font-medium mt-3">
              <span>Итого приютам</span>
              <span>2 000 руб.</span>
            </div>
            <div className="flex justify-between text-[#EDE6DB] font-bold mb-2">
              <span>Итого</span>
              <span>8 800 руб.</span>
            </div>
            <ActionButton buttonName="Оформить заказ" />
          </form>
        </div>
      </div>

      <h2 className="m-4 text-xl text-[#574C3A]">Выбрать приют</h2>

      <div className="flex flex-col lg:flex-row justify-center gap-16 max-w-[90%] mx-auto px-4">
        <div className="grid gap-4 flex-1">
          {basketItems.map(({ id, name, vendor, price, imageUrl }) => (
            <ProductBasketMiniature
              id={id}
              name={name}
              vendor={vendor}
              price={price}
              imageUrl={imageUrl}
            />
          ))}
          <div className="flex items-center bg-[#A0937D] text-[#EDE6DB] rounded-xl gap-3 px-4 py-2">
            Дополнительная сумма пожертвований
            <input
              type="number"
              className="bg-[#EDE6DB] text-[#A0937D] ml-2 rounded-lg px-3 py-1 w-32 text-right outline-none"
            />
            руб.
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <div className="bg-[#A0937D] rounded-2xl p-3 flex flex-col gap-4"></div>
        </div>
      </div>
    </div>
  );
}
