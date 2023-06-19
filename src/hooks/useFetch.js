/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';

// Backend || Server ==> URL Address
export const api = axios.create({ baseURL: 'http://localhost:5000/api' });

// this File call from ==>
// 1) ../pages/Login 🟨 <Components />
// 2) ../pages/NewUser 🟨 <Components />
// 3) ../pages/NewRoom 🟨 <Components />
// 4) ../pages/NewHotel 🟨 <Components />
// 5) ../components/DataTable 🟨 <Components />

export const useFetch = (endPoint) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await api.get(endPoint);
				console.log(response);
				setData(response.data.data);
			} catch (error) {
				setError(error);
			}
			setLoading(false);
		};
		fetchData();
	}, [endPoint]);

	const reFetchData = async () => {
		setLoading(true);
		try {
			const { data } = await api.get(endPoint);
			setData(data);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};

	return { data, loading, error, reFetchData };
};

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// 🟨 REST api Section...🟨
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
export const userDataTable = (path) => {
	console.log(path);
	return useFetch(path);
};
export const allHotels = () => useFetch('/getAllHotel');
export const allRooms = () => useFetch('/rooms');
export const getUser = (id) => useFetch('/users/' + id);

export const dataDelete = (pathWithId) => api.delete(pathWithId);

export const sign_in = (credentials) => api.post('/auth/sign-in', credentials);
export const creatingNewUser = (newUserInfo) =>
	api.post('/auth/sign-up', newUserInfo);
export const creatingNewHotel = (newHotel) =>
	api.post('/createHotel', newHotel, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
export const updateNewHotel = (newHotel, id) =>
	api.put(`/updateHotel/${id}`, newHotel, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
export const creatingNewRoom = (hotelId, totalRoomInfo) =>
	api.post(`/rooms/${hotelId}`, totalRoomInfo);

export const createOrder = (data) => api.post(`/createOrder`, data);
export const bookOneRoom = (data) => api.post(`/createBookingHotel`, data);
const imageHostingUrl = 'https://api.cloudinary.com/v1_1/taiseen/image/upload';
export const imageUpload = (imgFile) => axios.post(imageHostingUrl, imgFile);
