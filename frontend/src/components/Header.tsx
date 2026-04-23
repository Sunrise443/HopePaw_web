import { MenuButton } from "./MenuButton";
import BasketIcon from "../assets/BasketIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getProfile } from "@/api/user";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/types/user";

export function Header() {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    login: "",
    email: "",
    city: "",
    money_sent: 0,
    roles: [],
  });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchProfile = async () => {
        try {
          const [profileRes] = await Promise.all([getProfile()]);
          setProfile(profileRes.data);
        } catch (error) {
          console.error("Ошибка при загрузке профиля:", error);
        }
      };

      fetchProfile();
    }
  }, [isAuthenticated]);

  const hasAdminOrManagerRole = () => {
    const roleNames = profile.roles?.map((role) => role.name) ?? [];
    return roleNames.includes("admin") || roleNames.includes("manager");
  };

  const hasAdminRole = () => {
    const roleNames = profile.roles?.map((role) => role.name) ?? [];
    return roleNames.includes("admin");
  };

  return (
    <div className="bg-[#A0937D] flex items-center justify-between p-4 text-[#EDE6DB] font-semibold">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="text-xl font-bold">
          HopePaw
        </NavLink>
        <MenuButton buttonName="Каталог" navLinkTo="/catalog" />
        <MenuButton buttonName="О нас" navLinkTo="/about" />
        {isAuthenticated && hasAdminOrManagerRole() ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-[#574C3A] text-[#EDE6DB]">
                  Администрирование
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    href="products-admin"
                    className="cursor-pointer"
                  >
                    Товары
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/partners-admin"
                    className="cursor-pointer"
                  >
                    Партнеры
                  </NavigationMenuLink>
                  {hasAdminRole() ? (
                    <NavigationMenuLink
                      href="/users-admin"
                      className="cursor-pointer"
                    >
                      Пользователи
                    </NavigationMenuLink>
                  ) : (
                    <></>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <></>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <NavLink to="/basket">
          <img
            loading="lazy"
            className="size-7"
            src={BasketIcon}
            alt="Иконка корзины"
          />
        </NavLink>

        {isAuthenticated ? (
          <NavLink to="/profile">
            <img
              loading="lazy"
              className="size-7"
              src={ProfileIcon}
              alt="Иконка профиля"
            />
          </NavLink>
        ) : (
          <div className="flex items-center space-x-4">
            <MenuButton buttonName="Вход" navLinkTo="/login" />
            <MenuButton buttonName="Регистрация" navLinkTo="/register" />
          </div>
        )}
      </div>
    </div>
  );
}
