import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = ( ) => {
    const { cartIsOpen, setCartIsOpen, cartQuantity } = useContext(CartContext);

    const toggleCart = () => {
        setCartIsOpen(!cartIsOpen);
    };
    
    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>
                {cartQuantity}
            </span>
        </div>
    )
}

export default CartIcon;