// I am using this contexty because there is no way to pass open prop in the Modal component 
// from deeply nested components like Cart component
import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: "", // "cart", "checkout"
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {

    const [progress, setProgress] = useState("");

    const showCart = () => {
        setProgress("cart");
    }

    const hideCart = () => {
        setProgress("");
    }

    const showCheckout = () => {
        setProgress("checkout");
    }

    const hideCheckout = () => {
        setProgress("");
    }

    const userProgressCtx = {
        progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }

    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext;