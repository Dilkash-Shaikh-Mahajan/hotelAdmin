export const userColumns = [
	{ field: '_id', headerName: 'ID', width: 50 },
	{
		field: 'user',
		headerName: 'User',
		width: 180,
		renderCell: (params) => {
			return (
				<div className='cellWithImg'>
					<img
						className='cellImg'
						src={
							params.row.img ||
							'https://i.ibb.co/MBtjqXQ/no-avatar.gif'
						}
						alt='avatar'
					/>
					{params.row.userName}
				</div>
			);
		},
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 220,
	},

	{
		field: 'country',
		headerName: 'Country',
		width: 100,
	},
	{
		field: 'city',
		headerName: 'City',
		width: 100,
	},
	{
		field: 'phone',
		headerName: 'Phone',
		width: 120,
	},
];

export const hotelColumns = [
	{
		field: 'title',
		headerName: 'Title',
		width: 250,
	},
	{
		field: 'headerImage',
		headerName: 'Header Image',
		width: 150,
		renderCell: (params) => {
			return (
				<img
					style={{ width: '100%', height: '60px' }}
					src={`http://localhost:5000/${params.row.headerImage}`}
					alt={params.row.title}
				/>
			);
		},
	},
	{
		field: 'type',
		headerName: 'Type',
		width: 100,
		renderCell: (params) => {
			return params.row.occupancy === 1 ? (
				<p style={{ marginTop: '15px' }}>Single Bed</p>
			) : params.row.occupancy === 2 ? (
				<p style={{ marginTop: '15px' }}>Double Bed</p>
			) : (
				<p style={{ marginTop: '15px' }}>Double Bed</p>
			);
		},
	},
	{
		field: 'address',
		headerName: 'Address',
		width: 230,
	},
	{
		field: 'city',
		headerName: 'City',
		width: 100,
	},
	{
		field: 'price',
		headerName: 'Price',
		width: 100,
	},
];

export const roomColumns = [
	{ field: '_id', headerName: 'ID', width: 70 },
	{
		field: 'title',
		headerName: 'Title',
		width: 230,
	},
	{
		field: 'desc',
		headerName: 'Description',
		width: 200,
	},
	{
		field: 'price',
		headerName: 'Price',
		width: 100,
	},
	{
		field: 'maxPeople',
		headerName: 'Max People',
		width: 100,
	},
];
