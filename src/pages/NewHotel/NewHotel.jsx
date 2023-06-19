import { creatingNewHotel, imageUpload } from '../../hooks/useFetch';
import { Navbar, Sidebar } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './NewHotel.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const NewHotel = ({ title }) => {
	const navigate = useNavigate();

	const initialValues = {
		title: '',
		description: '',
		address: '',
		city: '',
		price: '',
		occupancy: '',
		headerImage: null,
		images: null,
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('Title is required'),
		description: Yup.string().required('Description is required'),
		address: Yup.string().required('Address is required'),
		city: Yup.string().required('City is required'),
		price: Yup.string().required('Price is required'),
		headerImage: Yup.mixed().required('Image is required'),
		images: Yup.mixed()
			.notRequired('Please upload at least one file')
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
								value[i].type != 'image/png' &&
								value[i].type != 'image/jpg' &&
								value[i].type != 'image/jpeg'
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
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
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
				formData.append(
					'occupancy',
					parseInt(values.occupancy),
				);
				formData.append('price', parseInt(values.price));
				// 🟩🟩 all info save into database
				await creatingNewHotel(formData);
				navigate('/hotels');
			} catch (err) {
				console.log(err);
			}
		},
	});
	const handleFileChange = (event) => {
		formik.setFieldValue('headerImage', event.target.files[0]);
	};
	const handleImageFileChange = (event) => {
		formik.setFieldValue('images', event.target.files);
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

				<div className='bottom'>
					<form
						className='row w-100'
						encType='multipart/form-data'
						onSubmit={formik.handleSubmit}>
						<div className='col-md-6 my-2'>
							<label
								htmlFor='title'
								className='form-label'>
								Hotel Name
							</label>
							<input
								className='form-control'
								type='text'
								id='title'
								name='title'
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.title &&
							formik.errors.title ? (
								<div className='mt-2 text-danger'>
									{formik.errors.title}
								</div>
							) : null}
						</div>

						<div className='col-md-6 my-2'>
							<label
								htmlFor='description'
								className='form-label'>
								Description
							</label>
							<input
								className='form-control'
								type='text'
								id='description'
								name='description'
								value={
									formik.values.description
								}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.description &&
							formik.errors.description ? (
								<div className='mt-2 text-danger'>
									{
										formik.errors
											.description
									}
								</div>
							) : null}
						</div>

						<div className='col-md-6 my-2'>
							<label
								htmlFor='address'
								className='form-label'>
								Address
							</label>
							<input
								className='form-control'
								type='address'
								id='address'
								name='address'
								value={formik.values.address}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.address &&
							formik.errors.address ? (
								<div className='mt-2 text-danger'>
									{formik.errors.address}
								</div>
							) : null}
						</div>
						<div className='col-md-6 my-2'>
							<label
								htmlFor='city'
								className='form-label'>
								City
							</label>
							<input
								className='form-control'
								type='text'
								id='city'
								name='city'
								value={formik.values.city}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.city &&
							formik.errors.city ? (
								<div className='mt-2 text-danger'>
									{formik.errors.city}
								</div>
							) : null}
						</div>

						<div className='col-md-6 my-2'>
							<label
								htmlFor='occupancy'
								className='form-label'>
								Types of Guest House
							</label>

							<select
								class='form-select'
								id='occupancy'
								name='occupancy'
								value={formik.values.occupancy}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}>
								<option selected value={''}>
									Select
								</option>
								<option value='1'>
									Single Bed
								</option>
								<option value='2'>
									Double Bed
								</option>
								<option value='3'>
									Triple Bed
								</option>
							</select>

							{formik.touched.occupancy &&
							formik.errors.occupancy ? (
								<div className='mt-2 text-danger'>
									{formik.errors.occupancy}
								</div>
							) : null}
						</div>

						<div className='col-md-6 my-2'>
							<label
								htmlFor='price'
								className='form-label'>
								Price
							</label>
							<input
								className='form-control'
								type='price'
								id='price'
								name='price'
								value={formik.values.price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.price &&
							formik.errors.price ? (
								<div className='mt-2 text-danger'>
									{formik.errors.price}
								</div>
							) : null}
						</div>
						<div className='col-md-6 py-2'>
							<label className='form-label'>
								Header Background Image
							</label>

							<input
								// multiple
								name='headerImage'
								accept='.png,.jpg,.jpeg'
								type='file'
								className='form-control'
								onBlur={formik.handleBlur}
								onChange={handleFileChange}
								// onChange={(event) => {
								// 	setFieldValue(
								// 		'headerImage',
								// 		event.target.files,
								// 	);
								// }}
							/>

							{formik.touched.headerImage &&
							formik.errors.headerImage ? (
								<div className='mt-2 text-danger'>
									{
										formik.errors
											.headerImage
									}
								</div>
							) : null}
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
								onBlur={formik.handleBlur}
								onChange={handleImageFileChange}
								// onChange={(event) => {
								// 	setFieldValue(
								// 		'headerImage',
								// 		event.target.files,
								// 	);
								// }}
							/>

							{formik.touched.images &&
							formik.errors.images ? (
								<div className='mt-2 text-danger'>
									{formik.errors.images}
								</div>
							) : null}
						</div>

						<div className='d-flex justify-content-center '>
							<button
								className='submitButton py-2 px-4 rounded-3 mt-3'
								type='submit'>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewHotel;
