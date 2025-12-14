import { useEffect, useState } from "react";
import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";
import type { Item } from "../types/item.ts";
import { getItems } from "../api/items.ts";

export function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getItems();
        setItems(response.data);
        console.log(response);
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
        <Header isLoggedIn />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header isLoggedIn />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header isLoggedIn />
      <div className="static m-4">
        <h2 className="font-semibold text-lg mb-2">
          Покупая здесь, вы помогаете животным в приютах
        </h2>
        <p className="mb-4 text-sm">Популярные товары</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {items.map(({ id, name, vendor, price }) => (
            <ProductMiniature
              id={id}
              name={name}
              vendor={vendor}
              price={price}
              imageUrl="../assets/pic2.jpg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
