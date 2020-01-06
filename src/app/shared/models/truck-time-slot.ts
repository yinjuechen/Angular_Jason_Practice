import {TruckInfo} from './truck-info';

export class TruckTimeSlot {
  id: number;
  truckDetail: TruckInfo;
  startdate: Date;
  enddate: Date;
  truckModelId: number;
}
