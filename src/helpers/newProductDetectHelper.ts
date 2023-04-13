import { IProduct } from "@/types/IProduct";

export function newProductDetectHelper(product: IProduct) {
  const date = product.startsales.toString()
  const parsedDate = new Date('20' + date.slice(0,2) + '-' + date.slice(2,4) + '-' + date.slice(4))
  const difference = Date.now() - parsedDate.getTime()
  return difference / (1000 * 3600 * 24) < 14
}