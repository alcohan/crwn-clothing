import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

// import './navigation.styles.scss';
import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
    const { currentUser }  = useContext(UserContext);
    const { cartIsOpen, setCartIsOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    };

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>
                        Shop
                    </NavLink>
                    {currentUser ? 
                        (<NavLink as='span' className='nav-link' onClick={signOutHandler}>Sign Out</NavLink>) : 
                        (<NavLink to='/auth'>
                            Sign In
                        </NavLink>)
                    }
                    <CartIcon /> 
                </NavLinksContainer>
                {
                    //this is called short circuit operator
                cartIsOpen && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;