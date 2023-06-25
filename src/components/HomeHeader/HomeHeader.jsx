import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

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
		<>
			<div>
				<Navbar />
			</div>

			<OwlCarousel
				className='owl-main headerCarousel owl-theme'
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
		</>
	);
};

export default HomeHeader;
