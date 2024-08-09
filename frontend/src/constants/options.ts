import AirconditionerFilled from '@/assets/icons/options/airconditioner-filled.svg';
import AirconditionerUnfilled from '@/assets/icons/options/airconditioner-unfilled.svg';
import BedFilled from '@/assets/icons/options/bed-filled.svg';
import BedUnfilled from '@/assets/icons/options/bed-unfilled.svg';
import ClosetFilled from '@/assets/icons/options/closet-filled.svg';
import ClosetUnfilled from '@/assets/icons/options/closet-unfilled.svg';
import DeskFilled from '@/assets/icons/options/desk-filled.svg';
import DeskUnfilled from '@/assets/icons/options/desk-unfilled.svg';
import DoorLockFilled from '@/assets/icons/options/doorLock-filled.svg';
import DoorLockUnFilled from '@/assets/icons/options/doorLock-unfilled.svg';
import DryerFilled from '@/assets/icons/options/dryer-filled.svg';
import DryerUnfilled from '@/assets/icons/options/dryer-unfilled.svg';
import ElevatorFilled from '@/assets/icons/options/elevator-filled.svg';
import ElevatorUnfilled from '@/assets/icons/options/elevator-unfilled.svg';
import GasRangeFilled from '@/assets/icons/options/gasrange-filled.svg';
import GasRangeUnfilled from '@/assets/icons/options/gasrange-unfilled.svg';
import InternetFilled from '@/assets/icons/options/internet-filled.svg';
import InternetUnfilled from '@/assets/icons/options/internet-unfilled.svg';
import MicrowaveFilled from '@/assets/icons/options/microwave-filled.svg';
import MicrowaveUnfilled from '@/assets/icons/options/microwave-unfilled.svg';
import RefrigeratorFilled from '@/assets/icons/options/refrigerator-filled.svg';
import RefrigeratorUnfilled from '@/assets/icons/options/refrigerator-unfillled.svg';
import ShoesClosetFilled from '@/assets/icons/options/shoescloset-filled.svg';
import ShoesClosetUnfilled from '@/assets/icons/options/shoescloset-unfilled.svg';
import SinkFilled from '@/assets/icons/options/sink-filled.svg';
import SinkUnfilled from '@/assets/icons/options/sink-unfilled.svg';
import TvFilled from '@/assets/icons/options/tv-filled.svg';
import TvUnfilled from '@/assets/icons/options/tv-unfilled.svg';
import WashingMachineFilled from '@/assets/icons/options/washingmachine-filled.svg';
import WashingMachineUnfilled from '@/assets/icons/options/washingmachine-unfilled.svg';
import { OptionWithIcon } from '@/types/option';

const OPTIONS: OptionWithIcon[] = [
  {
    id: 1,
    name: 'airConditioner',
    Filled: AirconditionerFilled,
    Unfilled: AirconditionerUnfilled,
    displayName: '에어컨',
  },
  {
    id: 2,
    name: 'refrigerator',
    Filled: RefrigeratorFilled,
    Unfilled: RefrigeratorUnfilled,
    displayName: '냉장고',
  },
  {
    id: 3,
    name: 'microwaveOven',
    Filled: MicrowaveFilled,
    Unfilled: MicrowaveUnfilled,
    displayName: '전자레인지',
  },
  {
    id: 4,
    name: 'sink',
    Filled: SinkFilled,
    Unfilled: SinkUnfilled,
    displayName: '싱크대',
  },
  {
    id: 5,
    name: 'gasStove',
    Filled: GasRangeFilled,
    Unfilled: GasRangeUnfilled,
    displayName: '가스레인지/인덕션',
  },
  {
    id: 6,
    name: 'washingMachine',
    Filled: WashingMachineFilled,
    Unfilled: WashingMachineUnfilled,
    displayName: '세탁기',
  },
  {
    id: 7,
    name: 'dryer',
    Filled: DryerFilled,
    Unfilled: DryerUnfilled,
    displayName: '건조기',
  },
  {
    id: 8,
    name: 'internet',
    Filled: InternetFilled,
    Unfilled: InternetUnfilled,
    displayName: '인터넷',
  },
  {
    id: 9,
    name: 'bed',
    Filled: BedFilled,
    Unfilled: BedUnfilled,
    displayName: '침대',
  },
  {
    id: 10,
    name: 'desk',
    Filled: DeskFilled,
    Unfilled: DeskUnfilled,
    displayName: '책상',
  },
  {
    id: 11,
    name: 'closet',
    Filled: ClosetFilled,
    Unfilled: ClosetUnfilled,
    displayName: '옷장',
  },
  {
    id: 12,
    name: 'shoeRack',
    Filled: ShoesClosetFilled,
    Unfilled: ShoesClosetUnfilled,
    displayName: '신발장',
  },

  {
    id: 13,
    name: 'tv',
    Filled: TvFilled,
    Unfilled: TvUnfilled,
    displayName: 'TV',
  },
  {
    id: 14,
    name: 'elevator',
    Filled: ElevatorFilled,
    Unfilled: ElevatorUnfilled,
    displayName: '엘리베이터',
  },
  {
    id: 15,
    name: 'doorLock',
    Filled: DoorLockFilled,
    Unfilled: DoorLockUnFilled,
    displayName: '엘리베이터',
  },
];

const OPTION_COUNT = OPTIONS.length;

// eslint-disable-next-line simple-import-sort/exports
export { OPTION_COUNT, OPTIONS };
