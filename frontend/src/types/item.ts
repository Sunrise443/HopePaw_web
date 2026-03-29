export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  vendor: string;

  category_id: number;
  pet_type_id: number;

  file_id?: string | null;
  photo_url?: string | null;
}
