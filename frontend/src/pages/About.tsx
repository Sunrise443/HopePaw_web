import { Header } from "../components/Header.tsx";
import { VendorCard } from "../components/VendorCard.tsx";

const vendors = [
  {
    id: 1,
    name: "Jurassic Bark",
    description:
      "Заказать онлайн: https://www.jurassicbark-online.co.uk/ Позвоните по номеру: +44 (0) 1353 863883",
  },
  {
    id: 2,
    name: "Кошатник",
    description:
      "Заказать изделие ручной работы можно в Телеграм или позвонив по номеру: +7-980-090-00-00",
  },
  {
    id: 3,
    name: "Господи помоги",
    description: "Сто инфы о партнеере тут написано",
  },
];

export function About() {
  return (
    <div>
      <Header isLoggedIn />
      <div className="m-4 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl items-center mb-4">
          <h2 className="text-xl font-bold text-[#574C3A] text-center max-w-xl">
            Мы предлагаем товары для домашних животных от наших партнеров и
            помогаем тем, у кого пока нет семьи.
            <br />
            <br />
            Часть средств с каждой покупки направляется в приюты для животных —
            Вы сами можете выбрать организацию, которую хотите поддержать.
            <br />
            <br />
            Покупая у нас, вы радуете своего питомца и помогаете другим животным
            получить шанс на заботу и дом.
          </h2>

          <div className="bg-[#A0937D] p-6 rounded-[30px] w-[350px] mx-auto lg:mx-0">
            <h2 className="text-xl font-bold text-[#EDE6DB] mb-4">
              Вы можете связаться с нами
            </h2>
            <div className="text-xl text-[#EDE6DB]">
              По номеру телефона
              <br />
              +7 - 999 - 999 - 99 - 99
              <br />
              <br />
              По эл. почте
              <br />
              hopepaw@gmail.com
              <br />
              <br />
              Отправив нам письмо
              <br />
              Pottinger St, Hong Kong
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#574C3A] mb-4">
          Наши партнеры
        </h1>

        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              {...vendor}
              imageUrl="../assets/pic4.jpg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
