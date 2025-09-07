import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

// why use reducer here instead of useState ?
// because the state update depends on the previous state
// and also the state is complex (multiple sub-values)
// so useReducer is a better choice here

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.quantity;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items]; // copy the existing items array

        if(existingCartItemIndex > -1){
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + action.item.quantity
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems.push(action.item);
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,        
            
        }
    }
     if (action.type === 'REMOVE_ITEM') {
         
         const existingCartItemIndex = state.items.findIndex(
             (item) => item.id === action.id
        );
        
        let updatedTotalAmount;

        if(existingCartItemIndex > -1){
            updatedTotalAmount =
                state.totalAmount - state.items[existingCartItemIndex].price;
        }else{
            updatedTotalAmount = state.totalAmount;
        }
        
        const updatedItems = [...state.items]; // copy the existing items array
        
        if(existingCartItemIndex > -1){
            
            // item exists in the cart only one
            if(state.items[existingCartItemIndex].quantity === 1){
                updatedItems.splice(existingCartItemIndex, 1);
            }else{
                const updatedItem = {
                    ...state.items[existingCartItemIndex],
                    quantity: state.items[existingCartItemIndex].quantity - 1
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            }
        // no item exists in the cart
        }else{
            return state;
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: Math.max(updatedTotalAmount, 0),
        };
    }
    if(action.type === 'CLEAR_CART'){
        return {
            ...state,
            items: [],
            totalAmount: 0,
        }
    }
    return state;

}

export function CartContextProvider({ children }) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, {
        items: [],  // array of items in the cart
        totalAmount: 0, // total amount of the cart
    });

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    };
    const clearCart = () => {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCart,
    };

    console.log("CartContext state:", cartState);

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;