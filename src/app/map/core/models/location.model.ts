import type { Difficulty, MapPointType } from '@map/core/models/enums';

export interface MapPoint {
  label: string;
  description?: string;
  lon: number;
  lat: number;
  type: MapPointType;
  lineStyle?: string;
  segmentColor?: string;  // changes line colour from this point onwards
  showPin?: boolean;      // renders a labelled pin at this intermediate waypoint
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
