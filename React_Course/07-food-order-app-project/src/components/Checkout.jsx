import { useContext } from "react"
import Modal from "../UI/Modal"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { useHttp } from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {

    const cartCntx = useContext(CartContext);
    const UserProgressContx = useContext(UserProgressContext);

    const { 
        data,
        isLoading: isSending, 
        error, 
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig,{});

    function handleClose() {
        UserProgressContx.hideCheckout();
    }

    function handleFinish() {
        UserProgressContx.hideCheckout();
        cartCntx.clearCart();
        clearData();
    }

    function handleSubmit(e) {
        e.preventDefault();
        // submit the form
        const formData = new FormData(e.target);
        const customerData = Object.fromEntries(formData);

        console.log(customerData);

        sendRequest({
            order: {
                customer: customerData,
                items: cartCntx.items,
            }
        });
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Cancel</Button>
            <Button >Confirm</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && data.data && data.data.message && !error) {
        return <Modal open={UserProgressContx.progress === "checkout"} onClose={handleFinish}>
            <h2>Success {data.data.message}!</h2>
            <p>Your order of id {data.data.id} was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return (
        <Modal className="checkout" open={UserProgressContx.progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartCntx.totalAmount)}</p>

                <Input label="Your Full Name" id="full-name" type="text" />
                <Input label="Your Email" id="email" type="email" />
                <Input label="Your Street" id="street" type="text" />
                
                <div className="control-row">
                    <Input label="Your Postal Code" id="postal-code" type="text" />
                    <Input label="Your City" id="city" type="text" />
                </div>

                {error && <Error title="Failed to submit order." message={error} />}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}