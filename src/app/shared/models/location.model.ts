export type Difficulty = 'easy' | 'moderate' | 'hard';
export type Island = 'gozo' | 'comino' | 'malta';

export interface MapPoint {
  label: string;
  description?: string;
  lon: number;
  lat: number;
  type: 'destination' | 'parking' | 'waypoint' | string;
  lineStyle?: string;
  showButton?: boolean;
}

export interface Route {
  label: string;
  emoji?: string;
  mapPoints: MapPoint[];
}

export interface Location {
  id: number;
  title: string;
  slug: string;
  description: string;
  img: string;
  thumb?: string;
  lon: number;
  lat: number;
  url?: string;
  keywords?: string;
  rating?: number;
  images?: string[];
  mapPoints?: MapPoint[];
  routes?: Route[];
  difficulty: Difficulty;
  hidden?: boolean;
  tags: string[];
  locality?: string;
  showLabel?: boolean;
  clusterPriority?: boolean;
}
