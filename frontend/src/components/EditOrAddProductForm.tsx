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
import type { Item } from "@/types/item";
import { Pen, Plus } from "lucide-react";

interface EditOrAddProductFormProps {
  isEditing: boolean;
  item?: Item;
}

export function EditOrAddProductForm({
  isEditing,
  item,
}: EditOrAddProductFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      console.log("edit");
    } else {
      console.log("add");
    }
  };

  return (
    <Dialog>
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
                : "Заполните информацию о новом товаре и нажмите сохранить"}
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
              />
            </Field>
            <Field>
              <Label htmlFor="price">Цена</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={item?.price || ""}
                placeholder="Введите цену"
              />
            </Field>
            <Field>
              <Label htmlFor="description">Партнер</Label>
              <Input
                id="description"
                name="description"
                defaultValue={item?.vendor || ""}
                placeholder="Выберите партнера"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button type="submit">
              {isEditing ? "Сохранить" : "Добавить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
