import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";

import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  // state
  const [values, setValues] = useState(initialState);

  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("single product", p);
      setValues({ ...values, ...p.data });
    });
  };

  const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		//
		setValues({ ...values, [e.target.name]: e.target.value });
	};

  return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h4>Product update</h4>
					{/*JSON.stringify(values)*/}
					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						values={values}
            setValues={setValues}
					/>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;