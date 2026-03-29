import { useState, type Key } from "react";

import { ActionButton } from "./ActionButtons";
import { addItemToCart } from "../api/cart";

interface ProductMiniatureProps {
  id: Key;
  name: string;
  vendor: string;
  price: number;
  imageUrl: string | null | undefined;
}

export function ProductMiniature({
  id,
  name,
  vendor,
  price,
  imageUrl,
}: ProductMiniatureProps) {
  const [adding, setAdding] = useState(false);

  const imageToShowUrl = imageUrl || "../assets/pic2.jpg";

  const handleAddToCart = async () => {
    try {
      try {
        setAdding(true);
        await addItemToCart(Number(id));
      } finally {
        setAdding(false);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  return (
    <div
      key={id}
      className="bg-[#A0937D] rounded-[30px] w-full h-full p-3 flex flex-col"
    >
      {imageUrl ? (
        <img
          src={new URL(imageToShowUrl, import.meta.url).href}
          alt={name}
          className="rounded-[15px] object-cover w-full h-full mb-3"
        />
      ) : (
        <div className="rounded-[15px] w-full h-full mb-3 bg-[#EDE6DB] flex items-center justify-center">
          <span className="text-[#574C3A] text-sm">Тут пока что нет фото</span>
        </div>
      )}
      <div className="text-s text-[#574C3A] mb-1">
        {name}
        <br />
        <span className="text-[0.7rem]">{vendor}</span>
      </div>
      <div className="text-[#574C3A] font-semibold mb-3 text-right w-full text-sm">
        {`${price.toLocaleString()} руб.`}
      </div>
      <ActionButton
        buttonName="Купить"
        onClick={handleAddToCart}
        disabled={adding}
      />
    </div>
  );
}
