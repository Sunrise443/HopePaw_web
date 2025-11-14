import { NavLink } from "react-router-dom";

interface HeaderProps {
  buttonName: string;
  navLinkTo: string;
  //   buttonAction: {};
}

export function MenuButton({ buttonName, navLinkTo }: HeaderProps) {
  return (
    <button className="bg-[#574C3A] text-[#EDE6DB] rounded-[30px] px-4 py-1">
      <NavLink to={navLinkTo}>{buttonName}</NavLink>
    </button>
  );
}
