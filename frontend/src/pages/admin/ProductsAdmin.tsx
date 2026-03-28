import { getItems } from "@/api/items";
import { EditOrAddProductForm } from "@/components/EditOrAddProductForm";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
        setItems(response.data.items);
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
            <Card
              key={item.id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between">
                  {/* Левая часть с названием, описанием и тегами */}
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg font-semibold">
                        {item.name}
                      </CardTitle>
                      <Badge variant="secondary">{item.vendor}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    <div className="flex gap-2">
                      <Badge variant="outline">
                        Категория: {item.category_id}
                      </Badge>
                      <Badge variant="outline">Для: {item.pet_type_id}</Badge>
                    </div>
                  </div>

                  {/* Правая часть с ценой и кнопкой */}
                  <div className="flex flex-col items-end justify-between min-w-[120px]">
                    <div className="text-2xl font-bold text-primary whitespace-nowrap">
                      {item.price} ₽
                    </div>
                    <EditOrAddProductForm isEditing={true} item={item} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
