import  { computed, map } from 'nanostores'

export const $cart  = map<Record<number,CartItem | undefined>>({})

export function addItemToCart (item: ShopItem){

  const cartItem = $cart.get()[item.id]
  const quantity = cartItem ? cartItem.quantity : 0

  $cart.setKey(item.id,{
    item,
    quantity: quantity + 1
  })
}

export function removeItemFromCart(itemId: number) {
  $cart.setKey(itemId, undefined)
}

export const subtotal = computed($cart, (entires) => {
  let subtotal = 0
  Object.values(entires).forEach((entry) => {
    if(!entry) return

    subtotal += entry.quantity * entry.item.price
  })

  return subtotal
})