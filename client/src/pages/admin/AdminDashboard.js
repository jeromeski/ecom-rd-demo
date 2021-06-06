import React, {useEffect, useState} from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductsByCount } from '../../functions/product';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  },[]);

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(100)
      .then(res => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response.data)})
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">

            {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>All Products</h4>}
            {products.map(p => <div>{p.title}</div>)}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
