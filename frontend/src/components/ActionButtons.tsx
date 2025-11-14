interface HeaderProps {
  buttonName: string;
  //   buttonAction: {};
}

export function ActionButton({ buttonName }: HeaderProps) {
  return (
    <button className="bg-[#574C3A] text-[#EDE6DB] rounded-[15px] px-4 py-1">
      {buttonName}
    </button>
  );
}
