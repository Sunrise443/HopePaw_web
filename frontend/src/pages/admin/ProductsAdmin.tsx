import { getItems } from "@/api/items";
import { EditOrAddProductForm } from "@/components/EditOrAddProductForm";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            <Card
              key={item.id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {item.name}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {item.vendor}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {item.description}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">Категория: {item.category_id}</Badge>
                  <Badge variant="outline">Для: {item.pet_type_id}</Badge>
                </div>
                <div className="mt-4 text-2xl font-bold text-primary">
                  {item.price} ₽
                </div>
              </CardContent>

              <CardFooter className="flex justify-between gap-2 pt-2 border-t">
                <EditOrAddProductForm isEditing={true} item={item} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
