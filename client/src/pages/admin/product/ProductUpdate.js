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
	category: "",
	subs: [],
	shipping: "",
	quantity: "",
	images: [],
	colors: ["Black", "Brown", "Silver", "White", "Blue"],
	brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
	color: "",
	brand: ""
};

const ProductUpdate = ({ match }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([]);

  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("single product", p);
      setValues({ ...values, ...p.data });
    });
  };

  const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		//
		setValues({ ...values, [e.target.name]: e.target.value });
	};

    const handleCategoryChange = (e) => {
			e.preventDefault();
			console.log("CATEGORY CLICKED", e.target.value);
			setValues({ ...values, subs: [], category: e.target.value });
			getCategorySubs(e.target.value).then((res) => {
				console.log("SUB OPTIONS ON CATGORY CLICK", res);
				setSubOptions(res.data);
			});

		};

  return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h4>Product update</h4>
					{JSON.stringify(values)}
					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						values={values}
						setValues={setValues}
						handleCategoryChange={handleCategoryChange}
            categories={categories}
            setCategories={setCategories}
            subOptions={subOptions}
					/>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;