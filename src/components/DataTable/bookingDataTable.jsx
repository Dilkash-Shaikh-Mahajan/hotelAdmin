import {
	dataDelete,
	allHotelsBooking,
	userDataTable,
} from '../../hooks/useFetch';
import { Link, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import './DataTable.scss';

// this component call from ==> 🟨 ../pages/List.js 🟨 <Component/>
const DataTable2 = () => {
	const location = useLocation();
	const [list, setList] = useState();

	const path = location.pathname.split('/')[1];
	const { data } = userDataTable(`/getAllBookingHotel`);
	console.log(data);
	useEffect(() => {
		setList(data);
	}, [data, list]);

	const handleDelete = async (id) => {
		try {
			console.log('I am calling');
			await dataDelete(`/deleteHotel/${id}`);
			window.location.reload();
			console.log('I am calling2');
		} catch (err) {
			console.log(err);
		}
	};

	const hotelBookingColumns = [
		{
			field: 'guestUserName',
			headerName: 'Guest User Name',
			width: 200,
		},
		{
			field: 'bookedUserEmail',
			headerName: 'Guest User Email',
			width: 150,
		},

		{
			field: 'bookedUserMobileNumber',
			headerName: 'Guest Mobile Number',
			width: 180,
		},
		{
			field: 'checkInDate',
			headerName: 'Check In Date',
			width: 150,
			renderCell: (params) => {
				const date = new Date(params.row.checkInDate);
				const formattedDate = `${date
					.getDate()
					.toString()
					.padStart(2, '0')}-${(date.getMonth() + 1)
					.toString()
					.padStart(2, '0')}-${date.getFullYear()} ${date
					.getHours()
					.toString()
					.padStart(2, '0')}:${date
					.getMinutes()
					.toString()
					.padStart(2, '0')}`;
				return formattedDate;
			},
		},
		{
			field: 'checkOutDate',
			headerName: 'Check Out Date',
			width: 150,
			renderCell: (params) => {
				const date = new Date(params.row.checkOutDate);
				const formattedDate = `${date
					.getDate()
					.toString()
					.padStart(2, '0')}-${(date.getMonth() + 1)
					.toString()
					.padStart(2, '0')}-${date.getFullYear()} ${date
					.getHours()
					.toString()
					.padStart(2, '0')}:${date
					.getMinutes()
					.toString()
					.padStart(2, '0')}`;
				return formattedDate;
			},
		},
		{
			field: 'price',
			headerName: 'Price',
			width: 100,
			renderCell: function (params) {
				return params.row.price / 100;
			},
		},
	];
	return (
		<div className='dataTable'>
			<div className='dataTableTitle'>
				Booking Room Data
				<Link to={`/${path}/new`} className='link'>
					Add New Offline Room
				</Link>
			</div>

			<DataGrid
				rows={data}
				pageSize={5}
				// checkboxSelection
				className='dataGrid'
				rowsPerPageOptions={[5]}
				getRowId={(row) => row._id}
				columns={hotelBookingColumns}
			/>
		</div>
	);
};

export default DataTable2;
