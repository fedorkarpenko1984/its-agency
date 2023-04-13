import { IProduct } from "@/types/IProduct"
import { newProductDetectHelper } from "./newProductDetectHelper"

export const filtrationHelper = (products: IProduct[], filtersState:Set<string>): IProduct[] => {
  if (filtersState.has('avalible')) {
    products = products.filter(product => product.amount > 0)
      }
  if (filtersState.has('news')) {
        products = products.filter(product => newProductDetectHelper(product))
      }
  if (filtersState.has('exclusive')) {
        products = products.filter(product => product.exclusive)
      }
  if (filtersState.has('contract')) {
        products = products.filter(product => product.contract)
      }
  if (filtersState.has('discount')) {
        products = products.filter(product => product.discount)
  }
  return products  
}