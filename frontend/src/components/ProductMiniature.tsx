import type { Key } from "react";

import { ActionButton } from "./ActionButtons";

interface ProductMiniatureProps {
  id: Key;
  name: string;
  vendor: string;
  price: number;
  imageUrl: string;
}

export function ProductMiniature({
  id,
  name,
  vendor,
  price,
  imageUrl,
}: ProductMiniatureProps) {
  return (
    <div
      key={id}
      className="bg-[#A0937D] rounded-[30px] w-full h-[420px] p-3 flex flex-col"
    >
      <img
        src={new URL(imageUrl, import.meta.url).href}
        alt={name}
        className="rounded-[15px] object-cover w-full h-full mb-3"
      />
      <div className="text-s text-[#574C3A] mb-1">
        {name}
        <br />
        <span className="text-[0.7rem]">{vendor}</span>
      </div>
      <div className="text-[#574C3A] font-semibold mb-3 text-right w-full text-sm">
        {`${price.toLocaleString()} руб.`}
      </div>
      <ActionButton buttonName="Купить" />
    </div>
  );
}
