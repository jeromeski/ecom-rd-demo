  
import React, { useEffect, useState } from "react";
import Jumbotron from '../components/cards/Jumbotron';
import LoadingCard from '../components/cards/LoadingCard';
import ProductCard from '../components/cards/ProductCard';
import { getProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(3).then((res) => {
      setLoading(false)
      setProducts(res.data);
    });
  };

  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron  text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <div className="container">
        {loading ? <LoadingCard count={3} /> :
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
          }
      </div>
    
    </>
  );
};

export default Home;