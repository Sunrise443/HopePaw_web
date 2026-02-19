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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { useState } from "react";
import type { Role, UserProfile } from "@/types/user";

interface EditUserRoleProps {
  user: UserProfile;
  onSuccess?: () => void;
}

export function EditUserRole({ user, onSuccess }: EditUserRoleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (user) {
        await updateItem(user.id, {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          price: parseFloat(formData.get("price") as string),
        });
        console.log("edit");
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
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-5">
              <DialogTitle>Изменить роль пользователя</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Input
                  id="name"
                  name="name"
                  defaultValue={""}
                  placeholder="Введите название товара"
                  required
                />
              </Field>
            </FieldGroup>

            <DialogFooter className="justify-between mt-5">
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>
                  Отмена
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
