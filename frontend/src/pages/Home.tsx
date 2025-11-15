import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";

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
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 1,
    name: "Костюм для грейхаунда",
    vendor: "GodDog",
    price: 5500,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 2,
    name: "Кошачий свитер",
    vendor: "Усатые",
    price: 1000,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 3,
    name: "Миска рыбка",
    vendor: "Банановая рыба",
    price: 660,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 4,
    name: "Миска космокот",
    vendor: "Усатые",
    price: 660,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 5,
    name: "Костюм для грейхаунда",
    vendor: "Clown's costume",
    price: 2200,
    imageUrl: "../assets/pic2.jpg",
  },
  {
    id: 6,
    name: 'Костюм для таксы "Банан"',
    vendor: "idk",
    price: 0,
    imageUrl: "../assets/pic2.jpg",
  },
];

export function Home() {
  return (
    <div>
      <Header isLoggedIn />
      <div className="static m-4">
        <h2 className="font-semibold text-lg mb-2">
          Покупая здесь, вы помогаете животным в приютах
        </h2>
        <p className="mb-4 text-sm">Популярные товары</p>
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
