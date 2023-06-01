export const calcDiscountedPrice = (price: number, dicount: number) => {
  if (!dicount) return price

  const discountAmount = price * (dicount / 100)
  const finalPrice = price - discountAmount

  // console.log(discountAmount)
  // console.log(price)
  return finalPrice
}
