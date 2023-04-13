import { defineStore } from "pinia"
import { IBasketProduct } from "@/types/IBasketProduct"
import { IProduct } from "@/types/IProduct"

interface BasketStore {
  products: IBasketProduct[];
}

export const useBasketStore = defineStore({
  id: 'basketStore',
  state: () => ({
    products: []
  }) as BasketStore,

  getters: {
    getBasketProductsAmount(): number {
      return this.products.reduce(
        (allProducts, product) => allProducts += product.amountInBasket, 0)
    },
    getAllProductsSumPrice(): string {
      const price = this.products.reduce(
        (allProductsPrice, product) => {
          allProductsPrice += product.amountInBasket * product.product.price
          return allProductsPrice
        }, 0)
      const formated = new Intl.NumberFormat().format(price)
      return formated
    }
  },

  actions: {
    addProduct(newProduct: IProduct) {
      const productInBasket = this.products.find(
        product => product.product.id === newProduct.id
      )
      if (!productInBasket) {
        this.products.push({
          product: newProduct,
          amountInBasket: 1,
          markedForRemove: false
        })
      } else {
        productInBasket.amountInBasket++
      }
    },

    addProductFromBasket(newProduct: IBasketProduct) {
      const productInBasket = this.products.find(
        product => product.product.id === newProduct.product.id
      )!
      productInBasket.amountInBasket += 1
    },

    removeProductFromBasket(newProduct: IBasketProduct) {
      const productInBasket = this.products.find(
        product => product.product.id === newProduct.product.id
      )!
      productInBasket.amountInBasket -= 1
      if (productInBasket.amountInBasket === 0) {
        const index = this.products.findIndex(
          product => product.product.id === newProduct.product.id
        )!
        this.products.splice(index, 1)
      }
    },

    productMarking(id: string) {
      const index = this.products.findIndex(product => product.product.id === id)
      this.products[index].markedForRemove = true
    },

    productUnmarking(id: string) {
      const index = this.products.findIndex(product => product.product.id === id)
      this.products[index].markedForRemove = false
    },

    removeMarkedProducts() {
      this.products = this.products.filter(product => !product.markedForRemove)
    },

    clearProductList() {
      this.products = []
    },
    
  }
})