import { getAllUsers } from "@/api/user";
import { EditUserRole } from "@/components/EditUserRole";
import { Header } from "@/components/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "@/types/user";
import { useEffect, useState } from "react";

export function UsersAdmin() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllUsers();
      setUsers(response.data);
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
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div className="items-center gap-2">
                    <CardTitle className="text-lg font-semibold">
                      {user.login}
                    </CardTitle>
                    id: {user.id}
                    <br />
                    {user.email}
                    <br />
                    Город {user.city || " не указан"}
                    <br />
                    Денег отправлено в приюты: {user.money_sent}
                  </div>
                  <EditUserRole user={user} onSuccess={fetchPartners} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
