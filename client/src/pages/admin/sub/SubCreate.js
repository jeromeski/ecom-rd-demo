import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import { createSub, removeSub } from '../../../functions/sub';

const SubCreate = ({ history, match }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState('');
	const [keyword, setKeyword] = useState('');
	const [loading, setLoading] = useState('');
	const [category, setCategory] = useState('');
	const [categories, setCategories] = useState([]);

	const loadCategories = () =>
		getCategories().then((res) => {
			setCategories(res.data);
		});

	useEffect(() => {
		loadCategories();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);
		createSub({ name, parent: category }, user.token)
			.then((res) => {
				setLoading(false);
				setCategory('');
				toast.success(`${res.data.name} is created`);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.response.data);
			});
	};

	const handleRemove = async (slug) => {
		if (window.confirm('Delete?')) {
			setLoading(true);
			await removeSub(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.success(`${res.data} is removed`);
				})
				.catch((err) => {
					if (err.response.status === 400) {
						setLoading(false);
						toast.error(err.response.data);
					}
				});
		}
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>

				<div className='col-md-10'>
					{loading ? <h4 className='text-danger'>Loading..</h4> : <h4>Create sub category</h4>}

					<div className='form-group'>
						<label>Parent category</label>
						<select
							name='category'
							className='form-control'
							onChange={(e) => setCategory(e.target.value)}>
							<option>Select Category</option>
							{categories.length > 0 &&
								categories.map((c) => (
									<option key={c._id} value={c._id}>
										{c.name}
									</option>
								))}
						</select>
					</div>

					{JSON.stringify(category)}

					<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

					{/* step 2 and step 3 */}
					<LocalSearch keyword={keyword} setKeyword={setKeyword} />

					{/* step 5 */}
					{/* {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))} */}
				</div>
			</div>
		</div>
	);
};

export default SubCreate;
