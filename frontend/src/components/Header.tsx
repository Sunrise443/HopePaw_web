import { MenuButton } from "./MenuButton";
import BasketIcon from "../assets/BasketIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-[#A0937D] flex items-center justify-between p-4 text-[#EDE6DB] font-semibold">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="text-xl font-bold">
          HopePaw
        </NavLink>
        <MenuButton buttonName="Каталог" navLinkTo="/catalog" />
        <MenuButton buttonName="О нас" navLinkTo="/about" />
      </div>

      <div className="flex items-center space-x-4">
        <NavLink to="/basket">
          <img className="size-7" src={BasketIcon} alt="Корзина" />
        </NavLink>

        {isAuthenticated ? (
          <NavLink to="/profile">
            <img className="size-7" src={ProfileIcon} alt="Профиль" />
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
