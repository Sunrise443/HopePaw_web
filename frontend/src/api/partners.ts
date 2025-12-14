import api from "./axios";
import type { Partner } from "../types/partner";

export const getPartners = () => {
  return api.get<Partner[]>("/partners/partners/");
};
