
export interface BaseProduct {
  id: string;
  name: string;
  item_code: string;
  type: 'necklace' | 'bracelet';
  description: string;
  base_price: number;
  stock_quantity: number;
  svg_template_url: string;
  preview_image_url: string;
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
  svg_icon_url: string;
  thumbnail_url: string;
  is_active: boolean;
}

export const BASE_PRODUCTS: BaseProduct[] = [
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `base-necklace-${i + 1}`,
    name: `Premium Gold Necklace ${i + 1}`,
    item_code: `NK-00${i + 1}`,
    type: 'necklace' as const,
    description: 'A beautiful 18k gold necklace base.',
    base_price: 150 + i * 20,
    stock_quantity: 50,
    svg_template_url: '/templates/necklace-base.svg',
    preview_image_url: `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800`,
    is_active: true,
  })),
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `base-bracelet-${i + 1}`,
    name: `Elegant Silver Bracelet ${i + 1}`,
    item_code: `BR-00${i + 1}`,
    type: 'bracelet' as const,
    description: 'A sleek sterling silver bracelet base.',
    base_price: 80 + i * 15,
    stock_quantity: 50,
    svg_template_url: '/templates/bracelet-base.svg',
    preview_image_url: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce33e?auto=format&fit=crop&q=80&w=800`,
    is_active: true,
  })),
];

export const CHARM_CATEGORIES: CharmCategory[] = [
  { id: 'cat-1', name: 'Amethyst', slug: 'amethyst', description: 'Deep purple stones', display_order: 1, is_active: true },
  { id: 'cat-2', name: 'Sapphire', slug: 'sapphire', description: 'Royal blue stones', display_order: 2, is_active: true },
  { id: 'cat-3', name: 'Emerald', slug: 'emerald', description: 'Vibrant green stones', display_order: 3, is_active: true },
  { id: 'cat-4', name: 'Ruby', slug: 'ruby', description: 'Classic red stones', display_order: 4, is_active: true },
  { id: 'cat-5', name: 'Diamond', slug: 'diamond', description: 'Sparkling clear stones', display_order: 5, is_active: true },
  { id: 'cat-6', name: 'Topaz', slug: 'topaz', description: 'Golden yellow stones', display_order: 6, is_active: true },
  { id: 'cat-7', name: 'Opal', slug: 'opal', description: 'Multicolor fire stones', display_order: 7, is_active: true },
];

export const CHARMS: Charm[] = CHARM_CATEGORIES.flatMap((cat) => 
  Array.from({ length: 7 }).map((_, i) => ({
    id: `charm-${cat.slug}-${i + 1}`,
    category_id: cat.id,
    name: `${cat.name} Charm ${i + 1}`,
    item_code: `CH-${cat.slug.slice(0, 2).toUpperCase()}-00${i + 1}`,
    description: `A beautiful precision-cut ${cat.name} stone.`,
    price: 30 + i * 10,
    stock_quantity: 100,
    svg_icon_url: '/charms/icon.svg',
    thumbnail_url: `https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=200`,
    is_active: true,
  }))
);
