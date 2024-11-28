import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItems(state, action) {
            const existingItems = state.find(item => item.id === action.payload.id);
            if (!existingItems) {
                state.push(action.payload);
            }
        },
        removeCartItems(state, action) {
            return state.filter(item => item.id !== action.payload);
        },
        updateCartItemQuantity(state, action) {
            const { id, qty, isSubProduct } = action.payload;

            const itemIndex = state.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                if (qty > 0) {
                    state[itemIndex].qty = qty;
                } else {
                    state.splice(itemIndex, 1);
                }
            }
            if (isSubProduct) {
                const item = state.find(item => item.subProducts && item.subProducts.find(sub => sub.id === id));
                const subProductIndex = item.subProducts.findIndex(sub => sub.id === id);
                item.subProducts[subProductIndex].qty = qty;
                const totalSubProductPrice = item.subProducts.reduce((total, sub) => total + sub.prize * sub.qty, 0);
                if (qty > -1) {
                    item.prize = item.prize * item.qty + totalSubProductPrice
                }
                else {
                    item.subProducts.splice(subProductIndex, 1);
                    item.prize = item.prize * item.qty - totalSubProductPrice
                }
            }
        }
    }
});

export const { addCartItems, removeCartItems, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
