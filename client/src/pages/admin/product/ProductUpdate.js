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
	brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "HP", "Toshiba"],
	color: "",
	brand: ""
};

const ProductUpdate = ({ match }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

   const loadProduct = () => {
			getProduct(slug).then((p) => {
				// console.log("single product", p);
				// 1 load single proudct
				setValues({ ...values, ...p.data });
				// 2 load single product category subs
				getCategorySubs(p.data.category._id).then((res) => {
					setSubOptions(res.data); // on first load, show default subs
				});
				// 3 prepare array of sub ids to show as default sub values in antd Select
				let arr = [];
				p.data.subs.map((s) => {
					arr.push(s._id);
				});
				console.log("ARR", arr);
				setArrayOfSubs((prev) => arr); // required for ant design select to work
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
			setValues({ ...values, subs: [] });
      setSelectedCategory(e.target.value);
			getCategorySubs(e.target.value).then((res) => {
				console.log("SUB OPTIONS ON CATGORY CLICK", res);
				setSubOptions(res.data);
			});
      if (values.category._id === e.target.value) {
				loadProduct();
			} else {
        setArrayOfSubs([]);
      }
			
		};

  return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h4>Product update</h4>
					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
						handleCategoryChange={handleCategoryChange}
						categories={categories}
						subOptions={subOptions}
						arrayOfSubs={arrayOfSubs}
						setArrayOfSubs={setArrayOfSubs}
						selectedCategory={selectedCategory}
					/>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;