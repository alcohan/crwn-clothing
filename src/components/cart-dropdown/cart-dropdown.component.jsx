import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const { cartItems, toggleCart } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        toggleCart();
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? 
                    cartItems.map(item => <CartItem cartItem={item} key={item.id} />) 
                    : <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={checkoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;