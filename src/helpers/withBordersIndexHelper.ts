import { IProduct } from "@/types/IProduct"

export const withBordersIndexHelper = (productsAmount: number, wrapper: HTMLElement) => {
  let productCardWidth = 0
  window.innerWidth > 992
    ? productCardWidth = 278
    : productCardWidth = 156
  const columns = Math.floor(wrapper.clientWidth / productCardWidth)
  let difference = productsAmount - Math.floor(productsAmount / columns) * columns
  if (difference === 0)     return productsAmount - columns
  return productsAmount - difference
}