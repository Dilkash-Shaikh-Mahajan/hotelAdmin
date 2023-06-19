import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bookOneRoom } from '../../hooks/useFetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import Swal from "re"
const Details = ({ apiData }) => {
	// const [show, setShow] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(startDate);
	const navigate = useNavigate();
	const initialValues = {
		name: '',
		checkIn: '',
		checkOut: '',
		mobileNumber: '',
	};
	console.log(apiData);
	// const { price } = apiData;
	const handleSubmit = async (values) => {
		console.log(values);
		try {
			let reqData = new FormData();
			reqData.append('amount', 1500);
			reqData.append('currency', 'INR');
			const { data } = await axios.put(
				'http://localhost:5000/api/create-order',
				{
					amount: apiData.price,
					currency: 'INR',
				},
			);
			console.log(data);
			const { amount, id } = data;

			var options = {
				key: 'rzp_test_DXb4qOZFFJhsDu',
				key_secret: '6QEGux3sfiRv483wqTA2aZMH',
				amount: amount,
				currency: 'INR',
				name: 'Floor Walk ',
				description:
					'FloorWalk provides a range of services from Market Research, Competition benchmarking & Retail Audits.',
				order_id: id,
				handler: async function (response) {
					// setPaymentLoading(true);
					// console.log(orderId);
					console.log(response);
					// const formData = new FormData();

					// formData.append('userName', values.name);
					// formData.append('checkIn', values.checkIn);
					// formData.append('checkOut', values.checkOut);
					// formData.append(
					// 	'mobileNumber',
					// 	values.mobileNumber,
					// );
					// formData.append(
					// 	'razorpay_payment_id',
					// 	response.razorpay_payment_id,
					// );
					// formData.append(
					// 	'razorpay_order_id',
					// 	response.razorpay_order_id,
					// );
					// formData.append(
					// 	'razorpay_signature',
					// 	response.razorpay_signature,
					// );
					// formData.append('roomId', apiData._id);
					let formData = {
						userName: values.name,
						checkIn: values.checkIn,
						checkOut: values.checkOut,
						mobileNumber: values.mobileNumber,
						razorpay_payment_id:
							response.razorpay_payment_id,
						razorpay_order_id:
							response.razorpay_order_id,
						razorpay_signature:
							response.razorpay_signature,
						roomId: apiData._id,
					};
					// 🟩🟩 all info save into database
					let { data } = await bookOneRoom(formData);
					console.log('Booking Details', data);
					// navigate('/hotels');
					if (data?.status) {
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Your Room is Book. Our Team will call you soon',
							showConfirmButton: false,
							timer: 5000,
						});
					}
					setTimeout(() => {
						navigate('/');
					}, 5500);
				},
			};
			var pay = await new window.Razorpay(options);
			pay.open();
		} catch (error) {
			console.log(error);
		}
	};
	const validationSchema = Yup.object({
		name: Yup.string().required('Name is required'),
		checkIn: Yup.string().required('Check In Date is required'),
		checkOut: Yup.string().required('Check Out Date is required'),
		mobileNumber: Yup.string().required('Mobile Number  is required'),
		// price: Yup.string().required('Price is required'),
	});
	return (
		<>
			<div>
				{' '}
				<div className='details'>
					<div className='container'>
						<div className='row'>
							<div className='col-xl-7 col-lg-6'>
								<div className='details_image'>
									<div
										className='background_image'
										// src={`http://localhost:5000/${image}`}
										style={{
											backgroundImage: `url(http://localhost:5000/${apiData.headerImage[0]})`,
										}}></div>
								</div>
							</div>

							<div className='col-xl-5 col-lg-6'>
								<div className='details_content'>
									<div className='details_title'>
										{apiData.occupancy ===
										1
											? ' Single Bed'
											: apiData.occupancy ===
											  2
											? ' Double	Bed'
											: ' Double	Bed'}
									</div>

									<div className='details_long_list'>
										{
											apiData.description
										}
									</div>
									<div className='book_now_button'>
										<button variant='primary'>
											Book Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className='bookForm'
				style={{
					marginTop: '130px',
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
					padding: '35px 0',
				}}>
				<div className='container'>
					<h3>Enter the Data</h3>
					<Formik
						// enableReinitialize
						validationSchema={validationSchema}
						// noValidate
						// validateOnBlur={true}
						initialValues={initialValues}
						onSubmit={(values) => {
							handleSubmit(values);
						}}>
						{({ values, setFieldValue }) => (
							<Form
								className='row w-100'
								encType='multipart/form-data'>
								<div className='col-md-6 my-2'>
									<label
										htmlFor='title'
										className='form-label'>
										Customer Name
									</label>
									<Field
										className='form-control'
										type='text'
										id='name'
										name='name'
										value={values.name}
									/>

									<div className='mt-2 text-danger'>
										<ErrorMessage name='name' />
									</div>
								</div>

								<div className='col-md-6 my-2'>
									<label
										htmlFor='description'
										className='form-label'>
										Customer Mobile
										Number
									</label>
									<Field
										className='form-control'
										type='text'
										id='mobileNumber'
										name='mobileNumber'
									/>

									<div className='mt-2 text-danger'>
										<ErrorMessage name='mobileNumber' />
									</div>
								</div>

								<div className='col-md-6 my-2'>
									<label
										htmlFor='address'
										className='form-label'
										style={{
											display: 'block',
										}}>
										Check In Date
									</label>
									<DatePicker
										className='h-100 w-100 form-control form-control-lg form-control-solid'
										selected={startDate}
										minDate={new Date()}
										name='checkIn'
										dateFormat='dd-MM-yyyy'
										onChange={(
											date,
										) => {
											setStartDate(
												date,
											);
											setFieldValue(
												'checkIn',
												new Date(
													date,
												).toLocaleDateString(
													'fr-CA',
												),
											);
										}}
									/>
									{/* <Field
										className='form-control'
										type='address'
										id='address'
										name='address'
									/> */}

									<div className='mt-2 text-danger'>
										<ErrorMessage name='checkIn' />
									</div>
								</div>
								<div className='col-md-6 my-2'>
									<label
										htmlFor='address'
										className='form-label'
										style={{
											display: 'block',
										}}>
										Check Out Date
									</label>
									<DatePicker
										className='h-100 w-100 form-control form-control-lg form-control-solid'
										selected={endDate}
										minDate={startDate}
										name='checkOut'
										dateFormat='dd-MM-yyyy'
										onChange={(
											date,
										) => {
											setEndDate(
												date,
											);
											console.log(
												new Date(
													date,
												).toLocaleDateString(
													'fr-CA',
												),
											);
											setFieldValue(
												'checkOut',
												new Date(
													date,
												).toLocaleDateString(
													'fr-CA',
												),
											);
										}}
									/>
									{/* <Field
										className='form-control'
										type='address'
										id='address'
										name='address'
									/> */}

									<div className='mt-2 text-danger'>
										<ErrorMessage name='checkOut' />
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
			</div>
		</>
	);
};

export default Details;
