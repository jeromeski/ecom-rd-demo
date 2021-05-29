import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { createCategory, getCategories } from '../../../functions/category';

const CategoryCreate = () => {
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory({ name }, user.token)
			.then((res) => {
				loadCategories();
				toast.success(`Category ${res.data.name} is created`);
				setLoading(false);
				setName('');
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = (c) => getCategories().then((res) => setCategories(res.data));

	const categoryForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Name</label>
				<input
					type='text'
					value={name}
					placeholder='Enter Category Name'
					onChange={(e) => setName(e.target.value)}
					className='form-control'
				/>
				<br />
				<button className='btn btn-outline-primary'>Save</button>
			</div>
		</form>
	);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{loading ? <h4>Loading...</h4> : <h4>Create Category</h4>}
					{categoryForm()}
					<div className='container'>
						<div className='row'>
							<div className='col'>
								{categories.map((c) => (
									<div key={c._id}>
										<button>{c.name}</button>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
