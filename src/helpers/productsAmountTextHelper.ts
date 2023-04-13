export const productsAmountTextHelper = (amount: number): string => {
  if (amount <= 14 && amount >= 11) return `${amount} ТОВАРОВ`
  const lastDigit = parseInt(amount.toString()[amount.toString().length - 1])
  if (lastDigit === 1) return `${amount} ТОВАР`
  if (lastDigit >= 2 && lastDigit <= 4) return `${amount} ТОВАРА`
  return `${amount} ТОВАРОВ`
}