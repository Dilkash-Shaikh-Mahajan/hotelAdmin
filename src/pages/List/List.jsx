import { Sidebar, Navbar, DataTable, DataTable2 } from './../../components';
import './List.scss';

const List = ({ columns, bookHotel }) => {
	return (
		<div className='list'>
			<Sidebar />

			<div className='listContainer'>
				<Navbar />
				{bookHotel ? (
					<DataTable2 />
				) : (
					<DataTable columns={columns} />
				)}
			</div>
		</div>
	);
};

export default List;
