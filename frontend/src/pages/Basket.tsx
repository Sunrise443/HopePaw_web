import { ActionButton } from "../components/ActionButtons";
import { Header } from "../components/Header";
import ProductBasketMiniature from "../components/ProductBasketMiniature";
import MapPicture from "../assets/map.png";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getCartItems, removeItemFromCart } from "../api/cart";
import type { Item } from "../types/item";
import { Helmet } from "react-helmet-async";

export default function Basket() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [donation, setDonation] = useState<number>(0);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCartItems();
      setItems(response.data);
    } catch (err) {
      console.error(err);
      setError("Ошибка при загрузке корзины");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const itemsTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const total = useMemo(() => {
    return itemsTotal + donation;
  }, [itemsTotal, donation]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeItemFromCart(itemId);
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error(err);
      alert("Не удалось удалить товар из корзины");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Ваша корзина</title>
        <meta
          name="description"
          content="Выбранные вами товары для животных. Оформите заказ и выберите приют, которому хотите помочь."
        />
        <link rel="canonical" href="http://localhost:5173/basket" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1 max-w-[90%] mx-auto px-4 py-4">
        <h1 className="text-xl text-[#574C3A] mb-4">Корзина</h1>

        <div className="flex flex-col lg:flex-row justify-center gap-16">
          {loading ? (
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
              <p className="text-2xl font-semibold text-[#574C3A]">
                Загрузка...
              </p>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] gap-4">
              <p className="text-xl font-semibold text-red-500">{error}</p>
              <button
                onClick={fetchItems}
                className="px-6 py-2 bg-[#A0937D] text-[#EDE6DB] rounded-xl hover:opacity-90 transition"
              >
                Попробовать снова
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 flex-1">
                {items.length > 0 ? (
                  items.map(({ id, name, vendor, price, photo_url }) => (
                    <ProductBasketMiniature
                      key={id}
                      id={id}
                      name={name}
                      vendor={vendor}
                      price={price}
                      imageUrl={photo_url}
                      onRemove={() => handleRemoveItem(id)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Корзина пуста
                  </p>
                )}

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
            </>
          )}
        </div>

        <section className="mt-12">
          <h1 className="text-xl text-[#574C3A] mb-4">Выбрать приют</h1>
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
                <img
                  src={MapPicture}
                  alt="Карта приютов"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
