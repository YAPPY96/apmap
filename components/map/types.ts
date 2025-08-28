// components/map/types.ts

export interface EventPosition {
  topLeft: { x: number; y: number };
  topRight: { x: number; y: number };
  bottomLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  position: EventPosition;
}

export interface BuildingProperties {
  full_id?: string;
  osm_id?: string;
  osm_type?: string;
  building?: string;
  historic?: string | null;
  source_ref?: string | null;
  shop?: string | null;
  'building:height'?: string | null;
  leisure?: string | null;
  'addr:postcode'?: string | null;
  'addr:housenumber'?: string | null;
  'addr:city'?: string | null;
  operator?: string | null;
  'name:en'?: string | null;
  ele?: string | null;
  height?: string | null;
  'building:levels'?: string | null;
  wikimedia_commons?: string | null;
  'roof:colour'?: string | null;
  amenity?: string | null;
  'building:colour'?: string;
  wikidata?: string | null;
  type?: string | null;
  name?: string;
  building_id?: string | null;
  [key: string]: any;
}

export interface BuildingGeometry {
  type: 'MultiPolygon' | 'Polygon';
  coordinates: number[][][] | number[][][][];
}

export interface BuildingFeature {
  type: 'Feature';
  properties: BuildingProperties;
  geometry: BuildingGeometry;
}

export interface BuildingGeoJSON {
  type: 'FeatureCollection';
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: BuildingFeature[];
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface UserLocation {
  coords: LocationCoordinates;
  timestamp: number;
}

// App-wide event type
export interface AppEvent {
  buildingName: string;
  eventName: string;
  time: string;
  description: string;
  date: string;
  image: string;
}