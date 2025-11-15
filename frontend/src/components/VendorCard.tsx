import type { Key } from "react";

interface VendorCardProps {
  id: Key;
  name: string;
  description: string;
  imageUrl: string;
}

export function VendorCard({
  id,
  name,
  description,
  imageUrl,
}: VendorCardProps) {
  return (
    <div
      key={id}
      className="bg-[#A0937D] rounded-[24px] p-4 flex items-center gap-6 w-full max-w-[900px]"
    >
      <img
        src={new URL(imageUrl, import.meta.url).href}
        alt={name}
        className="rounded-[10px] h-40 p-1"
      />
      <div className="flex flex-col gap-2 text-left">
        <div className="text-[#EDE6DB] font-bold">{name}</div>
        <h1 className="font-semibold text-[#EDE6DB]">{description}</h1>
      </div>
    </div>
  );
}
