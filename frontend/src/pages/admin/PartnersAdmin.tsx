import { getPartners } from "@/api/partners";
import { EditOrAddPartnerForm } from "@/components/EditOrAddPartnerForm";
import { Header } from "@/components/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { Partner } from "@/types/partner";

import { useEffect, useState } from "react";

export function PartnersAdmin() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = async () => {
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
        <EditOrAddPartnerForm isEditing={false} onSuccess={fetchPartners} />

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
                      {partner.name}
                    </CardTitle>
                  </div>
                  <EditOrAddPartnerForm
                    isEditing={true}
                    partner={partner}
                    onSuccess={fetchPartners}
                  />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
