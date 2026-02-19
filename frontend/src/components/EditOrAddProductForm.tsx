import { createItem, updateItem } from "@/api/items";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ItemEditOrAdd } from "@/types/item";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";

interface EditOrAddProductFormProps {
  isEditing: boolean;
  item?: ItemEditOrAdd;
  onSuccess?: () => void;
}

export function EditOrAddProductForm({
  isEditing,
  item,
  onSuccess,
}: EditOrAddProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (isEditing && item) {
        await updateItem(item.id, {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          price: parseFloat(formData.get("price") as string),
        });
      } else {
        await createItem({
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          price: parseFloat(formData.get("price") as string),
          vendor_id: parseInt(formData.get("vendor_id") as string),
          pet_type_id: parseInt(formData.get("pet_type_id") as string),
          category_id: parseInt(formData.get("category_id") as string),
        });
      }

      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Ошибка при сохранении товара:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          {isEditing ? (
            <Pen />
          ) : (
            <>
              Добавить товар <Plus />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Редактировать товар" : "Добавить товар"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Измените информацию о товаре и нажмите сохранить"
                : "Заполните информацию о новом товаре и нажмите добавить"}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                name="name"
                defaultValue={item?.name || ""}
                placeholder="Введите название товара"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="price">Цена</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="100"
                min="0"
                defaultValue={item?.price || ""}
                placeholder="Введите цену"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="description">Описание</Label>
              <Input
                id="description"
                name="description"
                defaultValue={item?.description || ""}
                placeholder="Введите описание товара"
                required
              />
            </Field>

            {!isEditing && (
              <>
                <Field>
                  <Label htmlFor="vendor_id">ID партнера</Label>
                  <Input
                    id="vendor_id"
                    name="vendor_id"
                    type="number"
                    placeholder="Введите ID партнера"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="pet_type_id">ID типа питомца</Label>
                  <Input
                    id="pet_type_id"
                    name="pet_type_id"
                    type="number"
                    placeholder="Введите ID типа питомца"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="category_id">ID категории</Label>
                  <Input
                    id="category_id"
                    name="category_id"
                    type="number"
                    placeholder="Введите ID категории"
                    required
                  />
                </Field>
              </>
            )}
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading}>
                Отмена
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Сохранение..."
                : isEditing
                  ? "Сохранить"
                  : "Добавить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
