import {User} from './user';

export class Application {
  id: number;
  user: User;
  email: string;
  phone: string;
  driver_license: string;
  order_date: Date;
  pickupdate: Date;
  returndate: Date;
  reservedid: number;
}
