import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header.tsx";
import { ProductMiniature } from "../components/ProductMiniature.tsx";
import type { Item } from "../types/item.ts";
import { getMyPurchases, getProfile, updateProfile } from "../api/user.ts";
import type { UserProfile } from "../types/user.ts";
import { useAuth } from "../context/AuthContext.tsx";

export function Profile() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    login: "",
    email: "",
    city: "",
    money_sent: 0,
  });

  const [initialProfile, setInitialProfile] = useState<UserProfile>({
    id: 0,
    login: "",
    email: "",
    city: "",
    money_sent: 0,
  });

  const [purchases, setPurchases] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const isChanged = useMemo(() => {
    return (
      profile.email !== initialProfile.email ||
      profile.city !== initialProfile.city
    );
  }, [profile, initialProfile]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, purchasesRes] = await Promise.all([
          getProfile(),
          getMyPurchases(),
        ]);

        setProfile(profileRes.data);
        setInitialProfile(profileRes.data);
        setPurchases(purchasesRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await updateProfile(profile.id, {
        login: profile.login,
        email: profile.email,
        city: profile.city,
      });

      setProfile(res.data);
      setInitialProfile(res.data);
    } catch (e) {
      console.log(e);
      alert("Ошибка при сохранении профиля");
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="static m-4">
        <div className="gap-24 mb-4 flex justify-center">
          <div className="bg-[#A0937D] p-6 rounded-[30px] shadow-md w-[600px]">
            <h2 className="text-xl font-bold text-[#574C3A] mb-4">
              Личные данные
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-24 text-sm text-[#EDE6DB] font-medium">
                  Логин
                </label>
                <input
                  value={profile.login}
                  disabled
                  className="flex-1 p-2 rounded-[15px] bg-[#EDE6DB] opacity-70"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-sm text-[#EDE6DB] font-medium">
                  Город
                </label>
                <input
                  value={profile.city ?? ""}
                  onChange={(e) =>
                    setProfile({ ...profile, city: e.target.value })
                  }
                  className="flex-1 p-2 rounded-[15px] bg-[#EDE6DB]"
                />
              </div>
              <div className="flex items-center">
                <label className="w-24 text-sm text-[#EDE6DB] font-medium">
                  Эл. почта
                </label>
                <input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="flex-1 p-2 rounded-[15px] bg-[#EDE6DB]"
                />
              </div>
            </div>
            {isChanged && (
              <button
                onClick={handleSave}
                className="bg-[#574C3A] text-[#EDE6DB] rounded-[15px] px-4 py-1 w-full mt-4"
              >
                Сохранить
              </button>
            )}
            <button
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="bg-[#574C3A] text-[#EDE6DB] rounded-[15px] px-4 py-1 w-full mt-4"
            >
              Выйти из профиля
            </button>
          </div>

          <div className="flex flex-col items-center justify-center text-center text-[#574C3A]">
            <h2 className="text-xl font-semibold mb-2">
              Вы уже отправили приютам:
            </h2>
            <p className="text-3xl font-bold">
              {profile.money_sent.toLocaleString()} руб.
            </p>
          </div>
        </div>
        <h1 className="text-[#574C3A] mb-4 ml-4 font-bold">Покупки</h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {purchases.map((item) => (
            <ProductMiniature
              key={item.id}
              id={item.id}
              name={item.name}
              vendor={item.vendor}
              price={item.price}
              imageUrl="../assets/pic2.jpg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
