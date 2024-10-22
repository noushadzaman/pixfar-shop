import { useDispatch } from "react-redux";
import { productAdded } from "../features/cart/cartSlice";
import { useState } from "react";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();
    const { id, image, title, price } = product;

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(productAdded({
            id, quantity, price,
            image: image,
            title: title
        }));
        setQuantity(1);
    };

    return (
        <div className="text-gray-700 cursor-pointer max-w-[350px] flex flex-col items-center">
            <div className="overflow-hidden">
                <img className="px-5 py-1 w-[305px] h-[352px] object-contain hover:scale-110 transition ease-in-out" src={image} alt="" />
            </div>
            <div>
                <p className="pt-3 pb-1 text-sm">{title}</p>
                <p className="text-sm font-medium">{price}</p>
            </div>
            <div className="flex justify-between w-full px-5 pt-2">
                <input
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || value === '0') return;
                        setQuantity(Number(value));
                    }}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    type="number"
                    min={1}
                    value={quantity}
                />
                <button onClick={handleAdd} className="bg-[#5ac2fe] p-1 rounded-xl shrink-0 active:bg-violet-700">Add to cart</button>
            </div>
        </div>
    );
};

export default ProductItem;
