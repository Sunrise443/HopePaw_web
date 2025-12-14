import { useEffect, useState } from "react";
import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";
import type { Item } from "../types/item.ts";
import { getItems } from "../api/items.ts";

const PET_TYPES = [
  { id: 0, value: 0, label: "Собака" },
  { id: 1, value: 1, label: "Кот" },
  { id: 2, value: 2, label: "Другое" },
];

const CATEGORIES = [
  { id: 0, value: "clothes", label: "Одежда" },
  { id: 1, value: "toys", label: "Игрушки" },
  { id: 2, value: "ammunition", label: "Аммуниция" },
  { id: 3, value: "food", label: "Еда" },
];

export function Catalog() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [petTypeId, setPetTypeId] = useState<number | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getItems({
          pet_type_id: petTypeId,
          category_id: categoryId,
          max_price: maxPrice,
        });
        setItems(response.data);
      } catch (err: unknown) {
        console.log(err);

        setError("Ошибка при загрузке товаров");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [petTypeId, categoryId, maxPrice]);

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
      <div className="static m-4">
        <div className="flex items-center space-x-4 mb-4">
          <select
            className="rounded-[15px] p-2 text-[#574C3A] bg-[#EDE6DB] font-medium w-[260px]"
            onChange={(e) => {
              setPetTypeId(e.target.value ? Number(e.target.value) : undefined);
            }}
            value={petTypeId ?? ""}
          >
            <option value="">Тип питомца</option>{" "}
            {PET_TYPES.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            className="rounded-[15px] p-2 text-[#574C3A] bg-[#EDE6DB] font-medium w-[260px]"
            onChange={(e) => {
              setCategoryId(
                e.target.value ? Number(e.target.value) : undefined
              );
            }}
            value={categoryId ?? ""}
          >
            <option value="">Категория</option>
            {CATEGORIES.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Цена в пределах"
            value={maxPrice ?? ""}
            onChange={(e) => {
              setMaxPrice(e.target.value ? Number(e.target.value) : undefined);
            }}
            className="rounded-[15px] p-2 text-[#574C3A] bg-[#EDE6DB] font-medium w-[260px]"
            min={0}
          />
        </div>

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
