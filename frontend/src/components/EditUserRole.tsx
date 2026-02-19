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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { useState } from "react";
import type { Role, UserProfile } from "@/types/user";
import { updateUserRole } from "@/api/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Константа с доступными ролями
const AVAILABLE_ROLES: Role[] = [
  { id: 0, name: "admin" },
  { id: 1, name: "manager" },
  { id: 2, name: "user" },
  { id: 3, name: "guest" },
];

interface EditUserRoleProps {
  user: UserProfile;
  onSuccess?: () => void;
}

export function EditUserRole({ user, onSuccess }: EditUserRoleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState<string>(
    user.role?.name || "",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUserRole(user.id, selectedRoleName);
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Ошибка при обновлении роли пользователя:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setSelectedRoleName(value);
  };

  // Проверка, является ли текущий пользователь админом (для предупреждения)
  const isCurrentUserAdmin = user.role?.name === "admin";
  // Проверка, пытается ли пользователь снять с себя права админа
  const isRemovingOwnAdmin = isCurrentUserAdmin && selectedRoleName !== "admin";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-5">
            <DialogTitle>
              Изменить роль пользователя {user.login || user.email}
            </DialogTitle>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel>Текущая роль</FieldLabel>
              <Input
                value={
                  user.role?.name === "admin"
                    ? "Администратор"
                    : user.role?.name === "manager"
                      ? "Менеджер"
                      : user.role?.name === "user"
                        ? "Пользователь"
                        : user.role?.name === "guest"
                          ? "Гость"
                          : "Не указана"
                }
                disabled
                className="bg-gray-100"
              />
            </Field>

            <Field>
              <FieldLabel>Новая роль</FieldLabel>
              <Select
                value={selectedRoleName}
                onValueChange={handleRoleChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_ROLES.map((role) => (
                    <SelectItem key={role.id} value={role.name}>
                      {role.name === "admin" && "Администратор"}
                      {role.name === "manager" && "Менеджер"}
                      {role.name === "user" && "Пользователь"}
                      {role.name === "guest" && "Гость"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {isRemovingOwnAdmin && (
              <p className="text-sm text-yellow-600 mt-2">
                Вы не можете удалить у себя права администратора
              </p>
            )}
          </FieldGroup>

          <DialogFooter className="justify-between mt-5">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isLoading}>
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={
                isLoading ||
                selectedRoleName === user.role?.name ||
                isRemovingOwnAdmin
              }
            >
              {isLoading ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
