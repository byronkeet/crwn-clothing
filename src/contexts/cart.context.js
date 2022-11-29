import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	
	  if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
			? { ...cartItem, quantity: cartItem.quantity + 1 }
			: cartItem
		);
	}
	
	  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

	const removeCartItem = (cartItems, cartItemToRemove) => {
		const existingCartItem = cartItems.find(
			(cartItem) => cartItem.id === cartItemToRemove.id
		);

		if (existingCartItem.quantity === 1) {
			return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
		}

		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
		);
	}

	const clearCartItem = (cartItems, cartItemToClear) => {
		return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
	}

export const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
	ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
	REMOVE_ITEM_TO_CART: 'REMOVE_ITEM_TO_CART',
	CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
	SET_CART_ITEMS: 'SET_CART_ITEMS'
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemToCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0
});

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0
}

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload
			}
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload
			}
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
}

export const CartProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

	const { isCartOpen, cartItems, cartCount, cartTotal } = state;
 
	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	}

	const updateCartItemsReducer = (newCartItems) => {
		const payload = {
			cartItems: newCartItems,
			cartCount: newCartItems.reduce((acc, item) => acc + item.quantity, 0),
			cartTotal: newCartItems.reduce((acc, item) => acc + ( item.price * item.quantity ), 0)
		}
		dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
	}

	const addItemToCart = (productToAdd) => {
		updateCartItemsReducer(addCartItem(state.cartItems, productToAdd));
	}

	const removeItemToCart = (cartItemtToRemove) => {
		updateCartItemsReducer(removeCartItem(state.cartItems, cartItemtToRemove));
	}

	const clearItemFromCart = (cartItemToClear) => {
		updateCartItemsReducer(clearCartItem(state.cartItems, cartItemToClear));
	}

	const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal, removeItemToCart, clearItemFromCart };

	return <CartContext.Provider value={value} >{children}</CartContext.Provider>
};