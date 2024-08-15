import AirConditioner from '@/assets/icons/option/airconditioner.svg';
import Closet from '@/assets/icons/option/closet.svg';
import Desk from '@/assets/icons/option/desk.svg';
import ElectronicStove from '@/assets/icons/option/eletronic-stove.svg';
import Microwave from '@/assets/icons/option/microwave.svg';
import Refrigerator from '@/assets/icons/option/refrigerator.svg';
import ShoesRack from '@/assets/icons/option/shoesRack.svg';
import Sink from '@/assets/icons/option/sink.svg';
import WashingMachine from '@/assets/icons/option/washingmachine.svg';
import { OptionWithIcon } from '@/types/option';

const OPTIONS: OptionWithIcon[] = [
  {
    id: 1,
    name: 'airConditioner',
    Icon: AirConditioner,
    displayName: '에어컨',
  },
  {
    id: 2,
    name: 'closet',
    Icon: Closet,
    displayName: '옷장',
  },
  {
    id: 3,
    name: 'desk',
    Icon: Desk,
    displayName: '책상',
  },
  {
    id: 4,
    name: 'microwaveOven',
    Icon: Microwave,
    displayName: '전자레인지',
  },

  {
    id: 5,
    name: 'shoeRack',
    Icon: ShoesRack,
    displayName: '신발장',
  },
  {
    id: 6,
    name: 'washingMachine',
    Icon: WashingMachine,
    displayName: '세탁기',
  },
  {
    id: 7,
    name: 'electronicStove',
    Icon: ElectronicStove,
    displayName: '인덕션',
  },
  {
    id: 8,
    name: 'sink',
    Icon: Sink,
    displayName: '싱크대',
  },
  {
    id: 9,
    name: 'refrigerator',
    Icon: Refrigerator,
    displayName: '냉장고',
  },
];

const OPTION_COUNT = OPTIONS.length;

const DEFAULT_OPTIONS: number[] = [];

// eslint-disable-next-line simple-import-sort/exports
export { DEFAULT_OPTIONS, OPTION_COUNT, OPTIONS };
