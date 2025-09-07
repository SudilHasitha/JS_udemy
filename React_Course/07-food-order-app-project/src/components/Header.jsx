import { useContext } from 'react';
import Button from '../UI/Button';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
export default function Header() {

  const cartCntx =  useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext);
  const totalItems = cartCntx.items.reduce((total, item) => total + item.quantity, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="Logo" />
            <h1>Foodz App</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalItems})</Button>
        </nav>
    </header>
  );
}