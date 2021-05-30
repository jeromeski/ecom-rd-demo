import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

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



	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{loading ? <h4 className='text-danger'>Loading..</h4> : <h4>Update category</h4>}
					<CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
					<hr />
				</div>
			</div>
		</div>
	);
};

export default CategoryUpdate;
