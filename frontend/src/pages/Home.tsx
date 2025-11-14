import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";

export function Home() {
  return (
    <div>
      <Header isLoggedIn />
      <div className="static m-4">
        <h2 className="font-semibold text-lg mb-2">
          Покупая здесь, вы помогаете животным в приютах
        </h2>
        <p className="mb-4 text-sm">Популярные товары</p>
        <div>
          <ProductMiniature
            id={1}
            name="SOMETHING FOR DOG"
            vendor="Silly DOgs"
            price={4000}
            imageUrl="../assets/d31497b627cfa44bc6b2283d2b27e116.jpg"
          />
        </div>
      </div>
    </div>
  );
}
