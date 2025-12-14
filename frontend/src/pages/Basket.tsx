import { ActionButton } from "../components/ActionButtons";
import { Header } from "../components/Header";
import ProductBasketMiniature from "../components/ProductBasketMiniature";
import MapPicture from "../assets/map.png";
import { useEffect, useState, useMemo } from "react";
import { getCartItems } from "../api/cart";
import type { Item } from "../types/item";

export default function Basket() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [donation, setDonation] = useState<number>(0);

  const itemsTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const total = useMemo(() => {
    return itemsTotal + donation;
  }, [itemsTotal, donation]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCartItems();
        setItems(response.data);
      } catch (err: unknown) {
        console.log(err);

        setError("Ошибка при загрузке товаров");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <h2 className="m-4 text-xl text-[#574C3A]">Корзина</h2>

      <div className="flex flex-col lg:flex-row justify-center gap-16 max-w-[90%] mx-auto px-4">
        <div className="grid gap-4 flex-1">
          {items.map(({ id, name, vendor, price }) => (
            <ProductBasketMiniature
              id={id}
              name={name}
              vendor={vendor}
              price={price}
              imageUrl="../assets/pic2.jpg"
            />
          ))}
          <div className="flex items-center bg-[#A0937D] text-[#EDE6DB] rounded-xl gap-3 px-4 py-2">
            Дополнительная сумма пожертвований
            <div className="flex items-center gap-2 ml-auto">
              <input
                type="number"
                min={0}
                value={donation || ""}
                onChange={(e) =>
                  setDonation(e.target.value ? Number(e.target.value) : 0)
                }
                className="bg-[#EDE6DB] text-[#A0937D] rounded-lg px-3 py-1 w-32 text-right outline-none"
              />
              руб.
            </div>
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
              <span>{donation.toLocaleString()} руб.</span>
            </div>
            <div className="flex justify-between text-[#EDE6DB] font-bold mb-2">
              <span>Итого</span>
              <span>{total.toLocaleString()} руб.</span>
            </div>
            <ActionButton buttonName="Оформить заказ" />
          </form>
        </div>
      </div>

      <h2 className="m-4 text-xl text-[#574C3A]">Выбрать приют</h2>

      <div className="flex flex-col lg:flex-row gap-16 max-w-[60%] mx-auto">
        <div className="flex-1 max-w-md">
          <form className="bg-[#A0937D] rounded-2xl p-3 flex flex-col gap-4">
            <input
              className="rounded-xl py-2 px-4 text-[#A0937D] bg-[#EDE6DB] placeholder-[#84795F] outline-none"
              placeholder="Город"
            />
            <input
              className="rounded-xl py-2 px-4 text-[#A0937D] bg-[#EDE6DB] placeholder-[#84795F] outline-none"
              placeholder="Организация"
            />
          </form>
        </div>

        <div className="grid gap-4 flex-1">
          <div className="bg-[#A0937D] rounded-2xl p-3 flex flex-col gap-4">
            <img src={MapPicture} alt="dfjgl" />
          </div>
        </div>
      </div>
    </div>
  );
}
