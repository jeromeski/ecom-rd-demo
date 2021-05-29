import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';

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

  const handleRemove = (slug) => {
    
    if(window.confirm('Delete?')) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
					toast.error(`${res.data.name} deleted`);
					loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data)
        })
    }
  }

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () => getCategories().then((res) => setCategories(res.data));

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
					<br />
					{categories.map((c) => (
						<div className='alert alert-secondary' key={c._id}>
							{c.name}
							<span onClick={() => handleRemove(c.slug)} className='btn btn-sm float-right'>
								<DeleteOutlined className='text-danger' />
							</span>
							<Link to={`/admin/category/${c.slug}`}>
								<span className='btn btn-sm float-right'>
									<EditOutlined className='text-warning' />
								</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
