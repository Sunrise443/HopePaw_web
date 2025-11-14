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
      className="bg-[#9C8F73] rounded-[30px] w-[300px] h-[420px] p-3 flex flex-col"
    >
      <img
        src={new URL(imageUrl, import.meta.url).href}
        alt={name}
        className="rounded-[15px] object-cover w-[300px] h-full mb-3"
      />
      <div className="text-s text-white mb-1">
        {name}
        <br />
        <span className="text-[0.7rem]">{vendor}</span>
      </div>
      <div className="text-white font-semibold mb-3 text-right w-full text-sm">
        {`${price.toLocaleString()} руб.`}
      </div>
      <ActionButton buttonName="Купить" />
    </div>
  );
}
