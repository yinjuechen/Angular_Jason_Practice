import {Category} from './category';

export class Product {
  id: number;
  brand: string;
  stock: number;
  category: Category;
  image: string;
  model: string;
  year: string;
  price: number;
  minseat: number;
  maxseat: number;
  mpg: number;
  mileprice: number;
}
