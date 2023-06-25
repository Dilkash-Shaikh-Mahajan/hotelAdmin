import React, { useEffect, useState } from 'react';
import { Booking, Footer, Gallary, HomeHeader } from '../../components';
import axios from 'axios';

const Home = () => {
	const backend_URL = `https://hotelmanagementbackend-production.up.railway.app/api/getAllHotel`;
	const [apiData, setApiData] = useState([]);
	useEffect(() => {
		getAllHotel();
	}, []);
	const getAllHotel = async () => {
		const response = await axios.get(backend_URL);
		console.log('apiData', response.data);
		setApiData(response.data);
	};

	return (
		<>
			<HomeHeader />
			<Gallary />
			<Booking apiData={apiData} />
			<Footer />
		</>
	);
};

export default Home;
