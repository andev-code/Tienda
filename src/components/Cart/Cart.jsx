import { useId, useState } from 'react'
import './Cart.css'
import { useCart } from '../../hooks/useCart'
import { CartItem } from '../CartItem/CartItem'

export function Cart() {
  const { cart, clearCart, addCart, restCart, checkIsMoreThanOne } = useCart()
  const cartCheckboxId = useId()
  const [isHidden, setIsHidden] = useState(true)

  const handleChange = ()=>{
    setIsHidden(!isHidden)
  }
  const labelClassName = ()=>{
    return isHidden ? 'fa-solid fa-shopping-cart' : 'fa-solid fa-arrow-right'
  }
 

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <i className={labelClassName()}></i>
      </label>
      <input onChange={handleChange} type="checkbox" id={cartCheckboxId} hidden />

      <aside className='cart'>
        <h1>Cart </h1>

        <ul className='cart-list'>
          {
            cart.length > 0
              ? cart.map(product => (
                <CartItem
                  src={product.src}
                  key={product.id}
                  detail={product.detail}
                  title={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  addCart={() => addCart(product)}
                  isMoreThanOne={checkIsMoreThanOne(product)}
                  restCart={() => restCart(product)}
                />
              ))

              : <span>No hay productos en el carrito...</span>
          }
        </ul>
        {
          cart.length > 0 &&
          <button className='brush' onClick={clearCart}><i className='fa-solid fa-brush'></i></button>
        }
      </aside>
    </>
  )
}