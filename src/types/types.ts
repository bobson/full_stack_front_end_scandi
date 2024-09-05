export interface Category {
  name: string;
}

export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  prices: Prices;
  brand: string;
  attributes: Attribute[];
}

interface Prices {
  id: number;
  product_id: string;
  amount: number;
  currency_label: string;
  currency_symbol: string;
}

export interface Attribute {
  id: number;
  product_id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

interface AttributeItem {
  id: number;
  attribute_id: number;
  display_value: string;
  value: string;
}

export interface CartItem {
  item: Product;
  quantity: number;
  attributes: Record<string, string>;
}

export interface WithRouterProps {
  navigate: (to: string) => void;
  params: Record<string, string>;
  categories: Category[];
}

// export interface Order {
//   id: number;
//   product_name: string;
//   price: number;
//   selected_attributes: Record<string, string>;
//   total_price: number;
//   total_items: number;
//   created_at: string;
//   updated_at: string;
// }
