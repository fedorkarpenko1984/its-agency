import { IProduct } from "./IProduct";

export interface IBasketProduct {
  product: IProduct;
  amountInBasket: number;
  markedForRemove: boolean;
}