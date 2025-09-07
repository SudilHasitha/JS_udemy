import {currencyFormatter } from '../util/formatting';

// without using context just using functions as props
export default function CartItem({name, quantity, price, onAdd, onRemove}) {
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} x {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onRemove}>-</button>
                <span>{quantity}</span>
                <button onClick={onAdd}>+</button>
            </p>    
        </li>
    )
}