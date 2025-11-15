import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";

const PET_TYPES = [
  { value: "dog", label: "Собака" },
  { value: "cat", label: "Кот" },
  { value: "other", label: "Другое" },
];

type Product = {
  id: number;
  name: string;
  vendor: string;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/pic3.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/pic3.jpg",
  },
];

export function Catalog() {
  return (
    <div>
      <Header isLoggedIn />
      <div className="static m-4">
        <div className="flex items-center space-x-4 mb-4">
          <select className="rounded-[15px] p-2 text-[#574C3A] bg-[#EDE6DB] font-medium w-[260px]">
            <option value="">Тип питомца</option>{" "}
            {PET_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select className="rounded-[15px] p-2 text-[#574C3A] bg-[#EDE6DB] font-medium w-[260px]">
            <option value="">Категория</option>
            {PET_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Цена в пределах"
            className="rounded-[15px] p-2 text-[#574C3A] bg-[#EDE6DB] font-medium w-[260px]"
            min={0}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {products.map(({ id, name, vendor, price, imageUrl }) => (
            <ProductMiniature
              id={id}
              name={name}
              vendor={vendor}
              price={price}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
