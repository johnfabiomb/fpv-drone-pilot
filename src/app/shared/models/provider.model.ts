export interface ProviderDiscount {
  label: string;
  coupon: string;
  instructions: string;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  color?: string;
  emoji: string;
  tagline: string;
  description?: string;
  coverImage?: string | null;
  images?: string[];
  website?: string;
  instagram?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  showOnMap?: boolean;
  mapLabel?: string;
  nearLocationIds?: number[];
  discount?: ProviderDiscount;
  highlights?: string[];
}
