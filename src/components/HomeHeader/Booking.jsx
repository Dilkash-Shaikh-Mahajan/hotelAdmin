import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

const Booking = () => {
	const navigate = useNavigate();
	const backend_URL = `https://hotelmanagementbackend-production.up.railway.app/api/getAllHotel`;
	const [apiData, setApiData] = useState([]);

	useEffect(() => {
		getAllHotel();
	}, []);
	const getAllHotel = async () => {
		const { data } = await axios.get(backend_URL);
		console.log('DataAll HOtels', data);
		setApiData(data);
	};
	const options = {
		loop: true,
		center: true,
		items: 3,
		margin: 0,
		autoplay: true,
		// dots: true,
		autoplayTimeout: 8500,
		smartSpeed: 450,
		nav: false,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 3,
			},
			1000: {
				items: 3,
			},
		},
	};
	let handleRoom = (api) => {
		navigate('/bookRoom', {
			state: {
				api: api,
			},
		});
	};
	return (
		<div>
			<div className='booking'>
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<div className='booking_title text-center'>
								<h2>Book a room</h2>
							</div>
							<div className='booking_text text-center'>
								<p>
									Vestibulum ante ipsum
									primis in faucibus orci
									luctus et ultrices posuere
									cubilia Curae; Suspendisse
									nec faucibus velit.
									Quisque eleifend orci
									ipsum, a bibendum lacus
									suscipit sit. Vestibulum
									ante ipsum primis in
									faucibus orci luctus et
									ultrices posuere cubilia
									Curae; Suspendisse nec
									faucibus velit. Quisque
									eleifend orci ipsum, a
									bibendum lacus suscipit
									sit.
								</p>
							</div>

							{/* <!-- Booking Slider --> */}
							<OwlCarousel
								id='customer-testimonoals'
								className='owl-carousel owl-theme'
								{...options}>
								{apiData?.map((api, index) => (
									<div
										key={index}
										className='item'
										style={{
											width: '350px',
											margin: '0 20px',
										}}>
										<div className='booking_item'>
											<div
												className='background_image'
												style={{
													backgroundImage: `url(http://localhost:5000/${api.headerImage[0]})`,
													// 'url(images/booking_1.jpg)',
												}}></div>
											<div className='booking_overlay trans_200'></div>
											<div className='booking_price'>
												₹{' '}
												{
													api.price
												}{' '}
												/ Per
												Day
											</div>
											<div className='booking_link'>
												<button
													onClick={() =>
														handleRoom(
															api,
														)
													}>
													{api.occupancy ===
													1
														? ' Single Bed'
														: api.occupancy ===
														  2
														? ' Double	Bed'
														: ' Double	Bed'}
												</button>
											</div>
										</div>
									</div>
								))}
							</OwlCarousel>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Booking;
