import { SubwayLineName } from '@/styles/subway';

export interface SubwayStation {
  stationName: string;
  stationLine: SubwayLineName[];
  walkingTime: number;
}

export type NearSubwayStations = SubwayStation[];
