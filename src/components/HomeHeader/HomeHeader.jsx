import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
	const apiData = [
		{
			image: './../../images/slider1.jpg',
		},
		{
			image: './../../images/slider2.jpg',
		},
		{
			image: './../../images/slider3.jpg',
		},
		{
			image: './../../images/slider4.jpg',
		},
		{
			image: './../../images/slider5.jpg',
		},
	];
	const options = {
		loop: true,
		margin: 10,
		items: 1,
		autoplay: true,
		// autoHeight: true,

		dots: false,
	};
	console.log('ApiDataHeader2', apiData);
	return (
		<div>
			<header className='header bg-black'>
				<div className='header_content d-flex flex-row align-items-center justify-content-start'>
					<div className='logo'>
						<Link to='/'>The River</Link>
					</div>
					<div className='ml-auto d-flex flex-row align-items-center justify-content-start'>
						<nav className='main_nav'>
							<ul className='d-flex flex-row align-items-start justify-content-start'>
								<li className='active'>
									<a href='index.html'>
										Home
									</a>
								</li>

								<li>
									<Link to='/'>Rooms</Link>
								</li>
							</ul>
						</nav>

						<div className='header_phone d-flex flex-row align-items-center justify-content-center'>
							<img src='images/phone.png' alt='' />
							<span>0183-12345678</span>
						</div>

						<div className='hamburger'>
							<i
								className='fa fa-bars'
								aria-hidden='true'></i>
						</div>
					</div>
				</div>
			</header>

			<div className='menu trans_400 d-flex flex-column align-items-end justify-content-start'>
				<div className='menu_close'>
					<i className='fa fa-times' aria-hidden='true'></i>
				</div>
				<div className='menu_content'>
					<nav className='menu_nav text-right'>
						<ul>
							<li>
								<a href='index.html'>Home</a>
							</li>

							<li>
								<Link to='/'>Rooms</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className='menu_extra'>
					<div className='menu_phone d-flex flex-row align-items-center justify-content-center'>
						<img src='images/phone-2.png' alt='' />
						<span>+91 9876543210</span>
					</div>
				</div>
			</div>
			<OwlCarousel
				className='owl-main  owl-theme'
				style={{ height: '700px' }}
				{...options}>
				{apiData?.map((image, index) => (
					<div className='item' key={index}>
						<img
							className='d-block w-100 h-50'
							// style={{ height: '200px' }}
							src={`${image.image}`}
							alt='First slide'
						/>
					</div>
				))}
			</OwlCarousel>
		</div>
	);
};

export default HomeHeader;
