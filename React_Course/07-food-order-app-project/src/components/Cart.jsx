import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
import Button from "../UI/Button";

export default function Cart() {

    const cartCnx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    function closeCartHandler() {
        userProgressCtx.hideCart();
    }

    function handleShowCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === 'cart' ? closeCartHandler : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCnx.items.map(item => (
               <CartItem 
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onAdd={() => cartCnx.addItem({...item, quantity: 1})}
                onRemove={() => cartCnx.removeItem(item.id)}
               />
            ))}
        </ul>
        <p className="cart-total">Total Amount: <span>{currencyFormatter.format(cartCnx.totalAmount)}</span></p>
        <p className="modal-actions">
            <Button textOnly onClick={closeCartHandler}>Close</Button>
            {cartCnx.items.length > 0 && <Button onClick={handleShowCheckout}>Order</Button>}
        </p>
    </Modal>
    )
}