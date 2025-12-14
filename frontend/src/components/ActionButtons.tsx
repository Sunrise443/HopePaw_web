interface ActionButtonProps {
  buttonName: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function ActionButton({
  buttonName,
  onClick,
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-[#574C3A] text-[#EDE6DB] rounded-[15px] px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {buttonName}
    </button>
  );
}
