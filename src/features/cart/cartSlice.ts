import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    products: Product[];
}
interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    quantity: number
}

const initialState: CartState = {
    products: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        productAdded: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
    },
});

export default cartSlice.reducer;
export const { productAdded } = cartSlice.actions;
