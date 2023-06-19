/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Footer, BookRoomDetail } from '../../components';
import axios from 'axios';
import { HeaderCarousel } from '..';
import { useLocation } from 'react-router-dom';

const BookRoom = () => {
	const location = useLocation();
	let BookRoomId = localStorage.getItem('bookRoom');
	const backend_URL = `http://localhost:5000/api/getHotel/${BookRoomId}`;
	const [apiData, setApiData] = useState([]);
	useEffect(() => {
		getAHotel();
	}, [BookRoomId]);
	const getAHotel = async () => {
		const { data } = await axios.get(backend_URL);
		console.log('Data', location.state.api);
		setApiData(data.data);
	};
	let roomData = location.state.api;
	// console.log('Data', );
	return (
		<>
			<HeaderCarousel apiData={roomData.images} />
			<BookRoomDetail apiData={roomData} />
			<Footer />
		</>
	);
};

export default BookRoom;
