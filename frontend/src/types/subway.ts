import { SubwayLineName } from '@/styles/subway';

export interface SubwayStation {
  name: string;
  line: SubwayLineName[];
  walkingTime: number;
}

export type NearSubwayStations = SubwayStation[];
