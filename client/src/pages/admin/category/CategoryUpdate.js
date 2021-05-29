import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategory, updateCategory } from '../../../functions/category';

const CategoryUpdate = ({ history, match }) => {
	console.log(match);
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadCategory();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateCategory(match.params.slug, { name }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				toast.success(`Category has been updated to ${res.data.name}`);
				history.push('/admin/category');
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	const loadCategory = () =>
		getCategory(match.params.slug).then((res) => {
			setName(res.data.name);
		});

	const categoryForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Name</label>
				<input
					type='text'
					className='form-control'
					onChange={(e) => setName(e.target.value)}
					value={name}
					autoFocus
					required
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
					{loading ? <h4 className='text-danger'>Loading..</h4> : <h4>Update category</h4>}
					{categoryForm()}
					<hr />
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
