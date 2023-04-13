import { IProduct } from "@/types/IProduct";
import { ISort } from "@/types/ISort";

export const sortingHelper = (products: IProduct[], actualSort: ISort): IProduct[] => {
  switch (actualSort.type) {
    case 'expensive':
      products.sort((prev: IProduct, next: IProduct) => next.price - prev.price);
    break;
    case 'cheap':
      products.sort((prev: IProduct, next: IProduct) => prev.price - next.price);
    break;
    case 'news':
      products.sort((prev: IProduct, next: IProduct) => parseInt(next.startsales) - parseInt(prev.startsales))
    break;
    case 'popular':
      products.sort((prev: IProduct, next: IProduct) => next.lastmonthsales - prev.lastmonthsales)
    break;
  }
  return products
}