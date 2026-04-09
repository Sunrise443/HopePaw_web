import { useEffect, useState } from "react";
import { Header } from "../components/Header.tsx";
import { VendorCard } from "../components/VendorCard.tsx";
import type { Partner } from "../types/partner.ts";
import { getPartners } from "../api/partners.ts";
import { Helmet } from "react-helmet-async";

export function About() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getPartners();
        setPartners(response.data);
      } catch (err: unknown) {
        console.log(err);

        setError("Ошибка при загрузке партнеров");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const helmet = (
    <>
      <Helmet>
        <title>О нас — Контакты и партнеры</title>
        <meta
          name="description"
          content="Узнайте о нашей идее, контактной информации и наших партнерах."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="http://localhost:5173/about" />
      </Helmet>
    </>
  );

  if (loading) {
    return (
      <div>
        {helmet}
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {helmet}
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {helmet}
      <Header />
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
            <h1 className="text-xl font-bold text-[#EDE6DB] mb-4">
              Вы можете связаться с нами
            </h1>
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
          {partners.map(({ id, name, description }) => (
            <VendorCard
              id={id}
              name={name}
              description={description}
              imageUrl="../assets/pic4.jpg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
