import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";

const PET_TYPES = [
  { value: "dog", label: "Собака" },
  { value: "cat", label: "Кот" },
  { value: "other", label: "Другое" },
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
