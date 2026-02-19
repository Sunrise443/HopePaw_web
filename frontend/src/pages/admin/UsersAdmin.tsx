import { getAllUsers } from "@/api/user";
import { EditOrAddPartnerForm } from "@/components/EditOrAddPartnerForm";
import { EditUserRole } from "@/components/EditUserRole";
import { Header } from "@/components/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "@/types/user";
import { useEffect, useState } from "react";

export function UsersAdmin() {
  const [partners, setPartners] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllUsers();
      setPartners(response.data);
    } catch (err: unknown) {
      console.log(err);
      setError("Ошибка при загрузке пользователей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

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

  if (error) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-semibold">
                      {partner.login}
                    </CardTitle>
                  </div>
                  <EditUserRole user={partner} onSuccess={fetchPartners} />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {partner.city}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
