import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';

import {
	CheckoutItemContainer,
	ImageContainer,
	BaseSpan,
	Quantity,
	Arrow,
	Value,
	RemoveButton
} from './checkout-item.styles';

type CheckoutItemProps = {
	cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({cartItem}) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, price, quantity, imageUrl } = cartItem;
	

	const removeItemHandler = () => {
		dispatch(removeItemFromCart(cartItems, cartItem));
	}
	const addItemHandler = () => {
		dispatch(addItemToCart(cartItems, cartItem));
	}
	const clearItemHandler = () => {
		dispatch(clearItemFromCart(cartItems, cartItem));
	}

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>{price}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	)
}

export default CheckoutItem;