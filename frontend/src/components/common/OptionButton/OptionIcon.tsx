import AirconditionerFilled from '@/assets/icons/options/airconditioner-filled.svg';
import AirconditionerUnfilled from '@/assets/icons/options/airconditioner-unfilled.svg';
import BedFilled from '@/assets/icons/options/bed-filled.svg';
import BedUnfilled from '@/assets/icons/options/bed-unfilled.svg';
import ClosetFilled from '@/assets/icons/options/closet-filled.svg';
import ClosetUnfilled from '@/assets/icons/options/closet-unfilled.svg';
import DeskFilled from '@/assets/icons/options/desk-filled.svg';
import DeskUnfilled from '@/assets/icons/options/desk-unfilled.svg';
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

const options = {
  airConditioner: { id: 1, filled: AirconditionerFilled, unfilled: AirconditionerUnfilled, name: '에어컨' },
  refrigerator: { id: 2, filled: RefrigeratorFilled, unfilled: RefrigeratorUnfilled, name: '냉장고' },
  microwaveOven: { id: 3, filled: MicrowaveFilled, unfilled: MicrowaveUnfilled, name: '전자레인지' },
  washingMachine: { id: 4, filled: WashingMachineFilled, unfilled: WashingMachineUnfilled, name: '세탁기' }, // Assuming Dryer represents Washing Machine
  sink: { id: 5, filled: SinkFilled, unfilled: SinkUnfilled, name: '싱크대' },
  gasStove: { id: 6, filled: GasRangeFilled, unfilled: GasRangeUnfilled, name: '가스레인지/인덕션' },
  internet: { id: 7, filled: InternetFilled, unfilled: InternetUnfilled, name: '인터넷' },
  bed: { id: 8, filled: BedFilled, unfilled: BedUnfilled, name: '침대' },
  desk: { id: 9, filled: DeskFilled, unfilled: DeskUnfilled, name: '책상' },
  closet: { id: 10, filled: ClosetFilled, unfilled: ClosetUnfilled, name: '옷장' },
  shoeRack: { id: 11, filled: ShoesClosetFilled, unfilled: ShoesClosetUnfilled, name: '신발장' },
  elevator: { id: 12, filled: ElevatorFilled, unfilled: ElevatorUnfilled, name: '엘리베이터' },
  dryer: { id: 13, filled: DryerFilled, unfilled: DryerUnfilled, name: '건조기' },
  tv: { id: 14, filled: TvFilled, unfilled: TvUnfilled, name: 'TV' },
};

const filledOptions = Object.values(options).map(option => option.filled);
const unfilledOptions = Object.values(options).map(option => option.unfilled);

const OPTION_COUNT = 14;

export { OPTION_COUNT, filledOptions, options, unfilledOptions };
