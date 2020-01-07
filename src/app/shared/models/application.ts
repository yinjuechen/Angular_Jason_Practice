import {User} from './user';
import {Insurance} from './insurance';

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
  insurance: Insurance;
  insurances: Insurance[];
}
