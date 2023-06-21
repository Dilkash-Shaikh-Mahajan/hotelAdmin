import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useDarkModeContext } from '../../context/DarkModeContext';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

// this component call from ==> 🟨 ../pages/Home.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/List.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/Single.js 🟨 <Component/>
const Sidebar = () => {
	const { dispatch } = useDarkModeContext();
	const { dispatch: userDispatch } = useAuthContext();

	const handleLogOut = () => {
		userDispatch({ type: 'LOGOUT' });
		localStorage.clear();
	};

	return (
		<div className='sideBar position-relative'>
			<div className='top'>
				<Link to='/'>
					<span className='logo'> Hotel Booking </span>
				</Link>
			</div>

			<div className='center'>
				<ul>
					<p className='title'>MAIN</p>
					<Link to='/'>
						<li>
							{' '}
							<DashboardIcon className='icon' />{' '}
							<span>Dashboard</span>
						</li>
					</Link>

					<p className='title'>LISTS</p>
					<Link to='/bookingRoom'>
						<li>
							{' '}
							<PersonOutlineIcon className='icon' />{' '}
							<span>Booking Room</span>
						</li>
					</Link>

					<Link to='/hotels'>
						<li>
							{' '}
							<ApartmentIcon className='icon' />{' '}
							<span>Hotels</span>
						</li>
					</Link>

					{/* import LocalShippingIcon from "@mui/icons-material/LocalShipping"; */}
					{/* <li> <LocalShippingIcon className="icon" /> <span>Delivery</span></li> */}
				</ul>
			</div>

			<div className='bottom position-absolute bottom-100'>
				<div
					className='colorOption'
					onClick={() => dispatch({ type: 'DARK' })}></div>
				<div
					className='colorOption'
					onClick={() => dispatch({ type: 'LIGHT' })}></div>
				<li onClick={handleLogOut}>
					{' '}
					<ExitToAppIcon className='icon' />{' '}
					<span>Logout</span>
				</li>
			</div>
		</div>
	);
};

export default Sidebar;
