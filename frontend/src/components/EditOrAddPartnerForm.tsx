// components/EditOrAddPartnerForm.tsx
import { createPartner, updatePartner, deletePartner } from "@/api/partners";
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
import type { Partner } from "@/types/partner";
import { Pen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface EditOrAddPartnerFormProps {
  isEditing: boolean;
  partner?: Partner;
  onSuccess?: () => void;
}

export function EditOrAddPartnerForm({
  isEditing,
  partner,
  onSuccess,
}: EditOrAddPartnerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (isEditing && partner) {
        await updatePartner(partner.id, {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
        });
      } else {
        await createPartner({
          name: formData.get("name") as string,
          description: formData.get("description") as string,
        });
      }

      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Ошибка при сохранении партнера:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!partner) return;

    setIsDeleteLoading(true);
    try {
      await deletePartner(partner.id);
      setIsDeleteDialogOpen(false);
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Ошибка при удалении партнера:", error);
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
                Добавить партнера <Plus />
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-5">
              <DialogTitle>
                {isEditing ? "Редактировать партнера" : "Добавить партнера"}
              </DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name">Название компании</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={partner?.name || ""}
                  placeholder="Введите название компании"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="description">Описание</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={partner?.description || ""}
                  placeholder="Введите описание деятельности"
                  required
                />
              </Field>
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
              Это действие нельзя отменить. Партнер "{partner?.name}" будет
              удален навсегда.
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
