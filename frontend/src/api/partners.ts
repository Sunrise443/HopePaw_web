import api from "./axios";
import type { Partner } from "@/types/partner";

export const getPartners = () => {
  return api.get<Partner[]>("/partners/partners/");
};

export const createPartner = (params: {
  name: string;
  description: string;
}) => {
  return api.post<Partner>("/partners/partners/", params);
};

export const updatePartner = (
  id: number,
  params: {
    name?: string;
    description?: string;
  },
) => {
  return api.patch<Partner>(`/partners/partner/${id}/`, params);
};

export const deletePartner = (id: number) => {
  return api.delete<Partner>(`/partners/partner/${id}`);
};
