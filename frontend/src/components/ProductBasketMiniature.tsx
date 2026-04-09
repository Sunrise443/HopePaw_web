import BucketIcon from "../assets/BucketIcon.svg";

interface ProductBasketMiniatureProps {
  id: number;
  name: string;
  vendor: string;
  price: number;
  imageUrl: string | null | undefined;
  onRemove: () => void;
}

export default function ProductBasketMiniature({
  id,
  name,
  vendor,
  price,
  imageUrl,
  onRemove,
}: ProductBasketMiniatureProps) {
  return (
    <div
      key={id}
      className="flex bg-[#A0937D] rounded-2xl min-w-[450px] p-2 justify-between"
    >
      <div className="flex gap-3">
        {imageUrl ? (
          <img
            src={new URL(imageUrl, import.meta.url).href}
            alt={`Фото выбранного товара ${name}`}
            className="w-[100px] h-full object-cover rounded-xl"
          />
        ) : (
          <div className="w-[100px] h-full rounded-xl bg-[#EDE6DB] flex items-center justify-center">
            <span className="text-[#574C3A] text-sm">Нет фото</span>
          </div>
        )}
        <div className="py-2 text-[#EDE6DB]">
          <div className="text-xl">{name}</div>
          <div className="text-xs">{vendor}</div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4 py-3">
        <span className="text-lg font-bold text-[#EDE6DB]">{price} руб.</span>
        <button onClick={onRemove} aria-label="Иконка корзины">
          <img className="size-7" src={BucketIcon} alt="Иконка корзины" />
        </button>
      </div>
    </div>
  );
}
