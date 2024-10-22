import { useSelector } from "react-redux";
import Cart from '../assets/cart_icon.png';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  products: Product[];
}

const Nav = () => {
    const { products } = useSelector((state: { cart: CartState }) => state.cart);

    const quantity = products.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    const totalPrice = products.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0);

    return (
        <div className="flex mt-3 items-center gap-5 justify-end">
            <img src={Cart} className="min-w-5" alt="cart icon" />
            <div className="">
                <p>Item: {quantity}</p>
                <p>Price: {totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default Nav;
