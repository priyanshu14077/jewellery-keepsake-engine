export interface BaseProduct {
  preview_image_url: string | Blob | undefined;
  id: string;
  name: string;
  item_code: string;
  type: 'necklace' | 'bracelet';
  description: string;
  price: number;
  stock_quantity: number;
  image: string;
  slots: string[];
  is_active: boolean;
}

export interface CharmCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface Charm {
  id: string;
  category_id: string;
  name: string;
  item_code: string;
  description: string;
  price: number;
  stock_quantity: number;
  thumbnail: string;
  image: string;
  is_active: boolean;
}

export const BASE_PRODUCTS: BaseProduct[] = [
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `base-necklace-${i + 1}`,
    name: i % 2 === 0 ? `Curb Flat Chain ${i + 1}` : `Paperclip Link Chain ${i + 1}`,
    item_code: `DUN-NK-00${i + 1}`,
    type: 'necklace' as const,
    description: 'A beautiful high-polished luxury base.',
    price: 14500 + i * 2500,
    stock_quantity: 50,
    image: `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800`,
    slots: ['slot_1', 'slot_2', 'slot_3', 'slot_4', 'slot_5'],
    is_active: true,
  })),
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `base-bracelet-${i + 1}`,
    name: `Tennis Link Bracelet ${i + 1}`,
    item_code: `DUN-BR-00${i + 1}`,
    type: 'bracelet' as const,
    description: 'A sleek sterling silver bracelet base.',
    price: 9800 + i * 1500,
    stock_quantity: 50,
    image: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce33e?auto=format&fit=crop&q=80&w=800`,
    slots: ['slot_1', 'slot_2', 'slot_3'],
    is_active: true,
  })),
];

export const CHARM_CATEGORIES: CharmCategory[] = [
  { id: 'cat-1', name: 'Celestial', slug: 'celestial', description: 'Cosmic wonders', display_order: 1, is_active: true },
  { id: 'cat-2', name: 'Botanical', slug: 'botanical', description: 'Nature series', display_order: 2, is_active: true },
  { id: 'cat-3', name: 'Precious', slug: 'precious', description: 'Handcrafted gems', display_order: 3, is_active: true },
];

export const CHARMS: Charm[] = CHARM_CATEGORIES.flatMap((cat) => 
  Array.from({ length: 7 }).map((_, i) => ({
    id: `charm-${cat.slug}-${i + 1}`,
    category_id: cat.id,
    name: `${cat.name} Element ${i + 1}`,
    item_code: `CH-${cat.slug.slice(0, 2).toUpperCase()}-00${i + 1}`,
    description: `A beautiful precision-cut ${cat.name} piece.`,
    price: 3500 + i * 1200,
    stock_quantity: 100,
    thumbnail: `https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=200`,
    image: `https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=400`,
    is_active: true,
  }))
);
