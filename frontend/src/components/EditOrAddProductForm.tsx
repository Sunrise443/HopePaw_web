import { createItem, updateItem, deleteItem } from "@/api/items";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Item } from "@/types/item";
import { Pen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface EditOrAddProductFormProps {
  isEditing: boolean;
  item?: Item;
  onSuccess?: () => void;
}

export function EditOrAddProductForm({
  isEditing,
  item,
  onSuccess,
}: EditOrAddProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, выберите изображение");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10 MB
        alert("Файл слишком большой (макс. 10 МБ)");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          photo: selectedFile,
        });
      }

      setIsOpen(false);
      setSelectedFile(null);
      setPhotoPreview(null);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;

    setIsDeleteLoading(true);
    try {
      await deleteItem(item.id);
      setIsDeleteDialogOpen(false);
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <>
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
            <DialogHeader className="mb-5">
              <DialogTitle>
                {isEditing ? "Редактировать товар" : "Добавить товар"}
              </DialogTitle>
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
                      min="0"
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
                      min="0"
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
                      min="0"
                      placeholder="Введите ID категории"
                      required
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="photo">Фото товара</Label>
                    <Input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleFileChange}
                      disabled={isLoading}
                    />
                    {photoPreview && (
                      <div className="mt-2">
                        <img
                          src={photoPreview}
                          alt="Photo addition preview"
                          className="w-full h-32 object-cover rounded-md border"
                        />
                      </div>
                    )}
                  </Field>
                </>
              )}
            </FieldGroup>

            <DialogFooter className="justify-between mt-5">
              {isEditing && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="flex gap-2">
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
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Товар "{item?.name}" будет удален
              навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleteLoading}>
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleteLoading ? "Удаление..." : "Удалить"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
