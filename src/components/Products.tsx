import { useEffect, useRef, useState } from "react";
import { useLazyGetProductsQuery } from "../features/api/apiSlice";
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Products = () => {
  const [page, setPage] = useState<number>(1);
  const [available, setAvailable] = useState<boolean>(true);
  const limit = 4;
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const loadRef = useRef<HTMLDivElement | null>(null);
  const [trigger, { isLoading }] =
    useLazyGetProductsQuery();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search !== "") {
      const filteredProducts = products.filter((item: Product) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]);
      setAvailable(true);
      trigger({ page: page, limit })
        .unwrap()
        .then((result) => setProducts(result));
    }
  }, [search, trigger]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result: Product[] = await trigger({ page, limit }).unwrap();
      const newProducts = [...products];
      let founded = 0;
      result.forEach((obj2: Product) => {
        const found = newProducts.find((obj1: Product) => obj1.id === obj2.id);
        if (!found) {
          newProducts.push(obj2);
        } else {
          founded += 1;
        }
        console.log(founded, result.length);

        if (founded === result.length) {
          setAvailable(false);
        }
      });
      setProducts(newProducts);
    };
    if (search === "") {
      fetchProducts();
    }
  }, [page, limit, trigger, search]);

  useEffect(() => {
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        !isLoading &&
        available &&
        search === ""
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(onIntersection, {
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (observer && loadRef.current) {
        observer.disconnect();
      }
    };
  }, [isLoading, available, search]);

  return (
    <div className="my-10">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4 gap-y-6">
        {search === ""
          ? products?.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : null}
        {search !== ""
          ? filteredProducts?.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : null}
      </div>

      <div
        ref={loadRef}
        className={`${search === "" ? "visible" : "invisible"}`}
      >
        {isLoading
          ? "Loading more products..."
          : available
          ? "loading..."
          : "No more products available"}
      </div>
    </div>
  );
};

export default Products;
