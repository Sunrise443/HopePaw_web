import { getItems } from "@/api/items";
import { EditOrAddProductForm } from "@/components/EditOrAddProductForm";
import { Header } from "@/components/Header";
import type { Item } from "@/types/item";

import { useEffect, useState } from "react";

export function ProductsAdmin() {
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
      <div className="p-4">
        <EditOrAddProductForm isEditing={false} />

        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <span>{item.name}</span>
              <EditOrAddProductForm isEditing={true} item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
