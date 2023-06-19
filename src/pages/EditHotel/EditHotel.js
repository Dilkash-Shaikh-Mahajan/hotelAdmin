import { updateNewHotel } from '../../hooks/useFetch';
import { Navbar, Sidebar } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './EditHotel.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const EditHotel = ({ title }) => {
	const { id } = useParams();
	const [responseData, setResponseData] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	console.log(id);
	console.log('I am here ', id);
	const getEditData = async () => {
		setLoading(true);
		const resData = await axios.get(
			`http://localhost:5000/api/getHotel/${id}`,
		);
		console.log(resData);
		setResponseData(resData.data.data);
		setLoading(false);
	};
	useEffect(() => {
		getEditData();
	}, []);
	console.log(responseData);
	const initialValues = {
		title: '',
		description: '',
		address: '',
		city: '',
		price: 'responseData.price',
		occupancy: 'responseData.occupancy',
		headerImage: null,
		images: null,
	};
	const editInitialValues = {
		title: responseData.title || '',
		description: responseData.description || '',
		address: responseData.address || '',
		city: responseData.city,
		price: responseData.price,
		occupancy: responseData.occupancy,
		headerImage: undefined,
		images: undefined,
	};

	console.log(initialValues);
	const validationSchema = Yup.object({
		title: Yup.string().required('Title is required'),
		description: Yup.string().required('Description is required'),
		address: Yup.string().required('Address is required'),
		city: Yup.string().required('City is required'),
		price: Yup.string().required('Price is required'),
		headerImage: Yup.mixed().required('Image is required'),
		images: Yup.mixed()
			.required('Please upload at least one file')
			.nullable(true)
			.test(
				'fileSize',
				'File size is greater than 1MB, Please upload file below 1MB.',
				(value) => {
					if (value) {
						// Iterate through each file
						for (let i = 0; i < value.length; i++) {
							if (value[i].size > 1024 * 1024) {
								// File size is larger than 1MB
								return false;
							}
						}
					}
					return true;
				},
			)
			.test(
				'fileType',
				'File Format is unsupported, Please upload jpg, png or jpeg format ',
				(value) => {
					if (value && value.length > 0) {
						for (let i = 0; i < value.length; i++) {
							if (
								value[i].type !== 'image/png' &&
								value[i].type !== 'image/jpg' &&
								value[i].type !== 'image/jpeg'
							) {
								return false;
							}
						}
					}
					return true;
				},
			),
		occupancy: Yup.number()
			.typeError('Occupancy must be a number')
			.required('Occupancy is required'),
	});

	const handleSubmit = async (values) => {
		// e.preventDefault();
		try {
			const formData = new FormData();
			console.log(values);
			Array.from(values.images).forEach((image, index) => {
				formData.append(`images`, image);
			});
			formData.append('headersImage', values.headerImage);
			formData.append('title', values.title);
			formData.append('description', values.description);
			formData.append('address', values.address);
			formData.append('city', values.city);
			formData.append('occupancy', parseInt(values.occupancy));
			formData.append('price', parseInt(values.price));
			// 🟩🟩 all info save into database
			await updateNewHotel(formData, id);
			navigate('/hotels');
		} catch (err) {
			console.log(err);
		}
	};

	// 3rd) 🟨🟨🟨 infos + image[array] send into server...
	// eslint-disable-next-line no-unused-vars
	// const handleClick = async (e) => {
	// 	e.preventDefault();

	// 	try {
	// 		// 🟩🟩 all info save into database
	// 		await creatingNewHotel(newHotel);
	// 		navigate('/hotels');
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<div className='newUser'>
			<Sidebar />

			<div className='newContainer'>
				<Navbar />

				<div className='top'>
					<h1>{title}</h1>
				</div>
				{loading ? (
					<h1>Loading....</h1>
				) : (
					<div className='bottom'>
						<Formik
							// enableReinitialize
							validationSchema={validationSchema}
							// noValidate
							// validateOnBlur={true}
							initialValues={
								id
									? editInitialValues
									: initialValues
							}
							onSubmit={(values) => {
								handleSubmit(values);
							}}>
							{({
								values,
								handleChange,
								handleBlur,
								setFieldValue,
								touched,
								errors,
							}) => (
								<Form
									className='row w-100'
									encType='multipart/form-data'>
									<div className='col-md-6 my-2'>
										<label
											htmlFor='title'
											className='form-label'>
											Hotel Name
										</label>
										<Field
											className='form-control'
											type='text'
											id='title'
											name='title'
											value={
												values.title
											}
										/>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='title' />
										</div>
									</div>

									<div className='col-md-6 my-2'>
										<label
											htmlFor='description'
											className='form-label'>
											Description
										</label>
										<Field
											className='form-control'
											type='text'
											id='description'
											name='description'
											// value={
											// 	formik
											// 		.values
											// 		.description
											// }
											// onChange={
											// 	formik.handleChange
											// }
											// onBlur={
											// 	formik.handleBlur
											// }
										/>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='description' />
										</div>
									</div>

									<div className='col-md-6 my-2'>
										<label
											htmlFor='address'
											className='form-label'>
											Address
										</label>
										<Field
											className='form-control'
											type='address'
											id='address'
											name='address'
										/>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='address' />
										</div>
									</div>
									<div className='col-md-6 my-2'>
										<label
											htmlFor='city'
											className='form-label'>
											City
										</label>
										<Field
											className='form-control'
											type='text'
											id='city'
											name='city'
										/>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='city' />
										</div>
									</div>

									<div className='col-md-6 my-2'>
										<label
											htmlFor='occupancy'
											className='form-label'>
											Types of Guest
											House
										</label>

										<Field
											as='select'
											class='form-select'
											id='occupancy'
											name='occupancy'>
											<option
												selected
												value={
													''
												}>
												Select
											</option>
											<option value='1'>
												Single
												Bed
											</option>
											<option value='2'>
												Double
												Bed
											</option>
											<option value='3'>
												Triple
												Bed
											</option>
										</Field>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='occupancy' />
										</div>
									</div>

									<div className='col-md-6 my-2'>
										<label
											htmlFor='price'
											className='form-label'>
											Price
										</label>
										<Field
											className='form-control'
											type='price'
											id='price'
											name='price'
										/>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='price' />
										</div>
									</div>
									<div className='col-md-6 py-2'>
										<label className='form-label'>
											Header
											Background
											Image
										</label>

										<input
											// multiple
											name='headerImage'
											accept='.png,.jpg,.jpeg'
											type='file'
											className='form-control'
											onChange={(
												event,
											) => {
												setFieldValue(
													'headerImage',
													event
														.target
														.files[0],
												);
											}}
										/>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='headerImage' />
										</div>
									</div>
									<div className='col-md-6 py-2'>
										<label className='form-label'>
											Images
										</label>

										<input
											multiple
											name='images'
											accept='.png,.jpg,.jpeg'
											type='file'
											className='form-control'
											onChange={(
												event,
											) => {
												setFieldValue(
													'images',
													event
														.target
														.files,
												);
											}}
										/>

										<div className='mt-2 text-danger'>
											<ErrorMessage name='images' />
										</div>
									</div>

									<div className='d-flex justify-content-center '>
										<button
											className='submitButton py-2 px-4 rounded-3 mt-3'
											type='submit'>
											Submit
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				)}
			</div>
		</div>
	);
};

export default EditHotel;
