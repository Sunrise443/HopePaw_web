import { MenuButton } from "./MenuButton";
import BasketIcon from "../assets/BasketIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  const ProfileButtons = () => {
    if (isLoggedIn) {
      return (
        <NavLink to={"/profile"}>
          <img className="size-7" src={ProfileIcon} alt="Профиль" />
        </NavLink>
      );
    }
    return (
      <div className="flex items-center space-x-4">
        <MenuButton buttonName="Вход" navLinkTo="/login" />
        <MenuButton buttonName="Регистрация" navLinkTo="/register" />
      </div>
    );
  };
  return (
    <div className="bg-[#A0937D] flex items-center justify-between p-4 text-[#EDE6DB] font-semibold">
      <div className="flex items-center space-x-4">
        <button className="text-xl font-bold">
          <NavLink to="/">HopePaw</NavLink>
        </button>
        <MenuButton buttonName="Каталог" navLinkTo="/catalog" />
        <MenuButton buttonName="О нас" navLinkTo="/about" />
      </div>

      <div className="flex items-center space-x-4">
        <button aria-label="Корзина">
          <NavLink to="/basket">
            <img className="size-7" src={BasketIcon} alt="Корзина" />
          </NavLink>
        </button>
        <ProfileButtons />
      </div>
    </div>
  );
}
