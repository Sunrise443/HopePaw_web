import { useEffect, useState } from "react";
import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";
import type { Item } from "../types/item.ts";
import { getItems } from "../api/items.ts";
import { Helmet } from "react-helmet-async";

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
        setItems(response.data.items);
      } catch (err: unknown) {
        console.log(err);

        setError("Ошибка при загрузке товаров");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const helmet = (
    <>
      <Helmet>
        <title>Главная — Товары для животных</title>
        <meta
          name="description"
          content="Купите товары для животных и помогите приютам. Популярные товары, скидки и новинки."
        />
        <link rel="canonical" href="http://localhost:5173/" />
        <meta name="robots" content="index, follow" />
      </Helmet>
    </>
  );

  if (loading) {
    return (
      <div>
        {helmet}
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
        {helmet}
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {helmet}
      <Header />
      <div className="static m-4">
        <h1 className="font-semibold text-lg mb-2">
          Покупая здесь, вы помогаете животным в приютах
        </h1>
        <h2 className="mb-4 text-sm">Популярные товары</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {items.map(({ id, name, vendor, price, photo_url }) => (
            <ProductMiniature
              key={id}
              id={id}
              name={name}
              vendor={vendor}
              price={price}
              imageUrl={photo_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
