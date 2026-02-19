export interface Item {
  id: number;
  name: string;
  price: number;
  vendor: string;
  category_id: number;
  pet_type_id: number;
}

export interface ItemEditOrAdd {
  id: number;
  name: string;
  description: string;
  price: number;
  vendor: string;
  category_id: number;
  pet_type_id: number;
}
