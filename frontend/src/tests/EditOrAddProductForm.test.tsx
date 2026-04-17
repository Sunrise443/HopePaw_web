import React, { type ReactNode, useMemo, useState } from "react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import { EditOrAddProductForm } from "../components/EditOrAddProductForm";
import { createItem, updateItem, deleteItem } from "@/api/items";
import type { Item } from "@/types/item";

vi.mock("@/api/items", () => ({
  createItem: vi.fn(),
  updateItem: vi.fn(),
  deleteItem: vi.fn(),
}));

const mockedCreateItem = vi.mocked(createItem);
const mockedUpdateItem = vi.mocked(updateItem);
const mockedDeleteItem = vi.mocked(deleteItem);

function renderForm(
  props?: Partial<React.ComponentProps<typeof EditOrAddProductForm>>,
) {
  const onSuccess = vi.fn();
  const utils = render(
    <EditOrAddProductForm
      isEditing={props?.isEditing ?? false}
      item={props?.item}
      onSuccess={props?.onSuccess ?? onSuccess}
    />,
  );

  return {
    ...utils,
    onSuccess: props?.onSuccess ?? onSuccess,
  };
}

async function openDialogByButton(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /добавить товар/i }));
}

async function fillCreateForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/название/i), "Корм для котов");
  await user.type(screen.getByLabelText(/цена/i), "1200");
  await user.type(screen.getByLabelText(/описание/i), "Хороший корм");
  await user.type(screen.getByLabelText(/id партнера/i), "7");
  await user.type(screen.getByLabelText(/id типа питомца/i), "2");
  await user.type(screen.getByLabelText(/id категории/i), "5");
}

describe("EditOrAddProductForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("модульный тест: рендерит кнопку добавления", () => {
    renderForm();

    expect(
      screen.getByRole("button", { name: /добавить товар/i }),
    ).toBeInTheDocument();
  });

  it("сценарий: открывает форму, валидирует ввод и вызывает createItem", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    mockedCreateItem.mockResolvedValueOnce({} as never);

    renderForm({ onSuccess });

    await openDialogByButton(user);
    await fillCreateForm(user);

    const file = new File(["fake image content"], "cat.png", {
      type: "image/png",
    });
    const fileInput = screen.getByLabelText(/фото товара/i);
    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(
        screen.getByRole("img", { name: /фото товара/i }),
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /добавить$/i }));

    await waitFor(() => {
      expect(mockedCreateItem).toHaveBeenCalledTimes(1);
    });

    expect(mockedCreateItem).toHaveBeenCalledWith({
      name: "Корм для котов",
      description: "Хороший корм",
      price: 1200,
      vendor_id: 7,
      pet_type_id: 2,
      category_id: 5,
      photo: file,
    });
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("сценарий: в режиме редактирования заполняет поля и вызывает updateItem", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    const item: Item = {
      id: 41,
      name: "Сухой корм",
      description: "Старое описание",
      price: 900,
    } as Item;

    mockedUpdateItem.mockResolvedValueOnce({} as never);

    renderForm({ isEditing: true, item, onSuccess });

    await user.click(
      screen.getByRole("button", { name: /кнопка редактировать товар/i }),
    );

    expect(screen.getByDisplayValue("Сухой корм")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Старое описание")).toBeInTheDocument();
    expect(screen.getByDisplayValue("900")).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/название/i));
    await user.type(screen.getByLabelText(/название/i), "Новый корм");
    await user.clear(screen.getByLabelText(/цена/i));
    await user.type(screen.getByLabelText(/цена/i), "1100");
    await user.clear(screen.getByLabelText(/описание/i));
    await user.type(screen.getByLabelText(/описание/i), "Новое описание");

    await user.click(screen.getByRole("button", { name: /сохранить/i }));

    await waitFor(() => {
      expect(mockedUpdateItem).toHaveBeenCalledTimes(1);
    });

    expect(mockedUpdateItem).toHaveBeenCalledWith(41, {
      name: "Новый корм",
      description: "Новое описание",
      price: 1100,
    });
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("сценарий: удаляет товар через confirm-dialog", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    const item: Item = {
      id: 15,
      name: "Игрушка",
      description: "Описание",
      price: 300,
    } as Item;

    mockedDeleteItem.mockResolvedValueOnce({} as never);

    renderForm({ isEditing: true, item, onSuccess });

    await user.click(
      screen.getByRole("button", { name: /редактировать товар/i }),
    );
    await user.click(screen.getByRole("button", { name: /удалить/i }));

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByText(/игрушка/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^удалить$/i }));

    await waitFor(() => {
      expect(mockedDeleteItem).toHaveBeenCalledWith(15);
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("обрабатывает ошибку сервера при создании и не вызывает onSuccess", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    mockedCreateItem.mockRejectedValueOnce(
      new Error("500 Internal Server Error"),
    );

    renderForm({ onSuccess });

    await openDialogByButton(user);
    await fillCreateForm(user);
    await user.click(screen.getByRole("button", { name: /добавить$/i }));

    await waitFor(() => {
      expect(mockedCreateItem).toHaveBeenCalledTimes(1);
    });

    expect(onSuccess).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
  });
});

// Примеры для пунктов проверку ролевого поведения интерфейса и защиты маршрутов, проверку корректной обработки серверных ошибок и истечения сессии

type Role = "admin" | "manager" | "user";

function RequireRole({
  role,
  allowed,
  children,
}: {
  role: Role;
  allowed: Role[];
  children: ReactNode;
}) {
  if (!allowed.includes(role)) {
    return <div>Нет доступа</div>;
  }

  return <>{children}</>;
}

function RequireAuth({
  session,
  children,
}: {
  session: { isAuthenticated: boolean } | null;
  children: ReactNode;
}) {
  if (!session?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function SessionAwareAction() {
  const [state, setState] = useState<"idle" | "expired" | "ok">("idle");

  async function handleClick() {
    try {
      const res = await Promise.reject({ status: 401 });
      if (res) {
        setState("ok");
      }
    } catch (error: any) {
      if (error?.status === 401) {
        setState("expired");
      }
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Отправить</button>
      {state === "expired" && <div>Сессия истекла</div>}
      {state === "ok" && <div>Готово</div>}
    </div>
  );
}

describe("role / route / session examples", () => {
  it("проверяет ролевое поведение интерфейса", () => {
    render(
      <RequireRole role="user" allowed={["admin", "manager"]}>
        <button>Удалить товар</button>
      </RequireRole>,
    );

    expect(screen.getByText("Нет доступа")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /удалить товар/i }),
    ).not.toBeInTheDocument();
  });

  it("проверяет защиту маршрута", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <RequireAuth session={null}>
                <div>Админка</div>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<div>Страница входа</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Страница входа")).toBeInTheDocument();
  });

  it("обрабатывает истечение сессии", async () => {
    const user = userEvent.setup();

    render(<SessionAwareAction />);

    await user.click(screen.getByRole("button", { name: /отправить/i }));

    expect(await screen.findByText("Сессия истекла")).toBeInTheDocument();
  });
});
