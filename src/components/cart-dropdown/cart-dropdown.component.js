import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goToCheckoutHandler = () => {
		dispatch(setIsCartOpen(false));
		navigate('/checkout');
	}
	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	)
}

export default CartDropdown;