import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDarkModeContext } from '../../context/DarkModeContext';
import './Navbar.scss';
import { useAuthContext } from '../../context/AuthContext';

// this component call from ==> 🟨 ../pages/Home.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/List.js 🟨 <Component/>
// this component call from ==> 🟨 ../pages/Single.js 🟨 <Component/>
const Navbar = () => {
	const { darkMode, dispatch } = useDarkModeContext();
	const { dispatch: userDispatch } = useAuthContext();
	const handleLogOut = () => {
		userDispatch({ type: 'LOGOUT' });
		localStorage.clear();
	};
	return (
		<div className='navbar'>
			<div className='wrapper'>
				<div className='searchBar'>
					<input type='text' placeholder='Search...' />
					<SearchOutlinedIcon />
				</div>

				<div className='items'>
					<div
						className='item'
						onClick={() =>
							dispatch({ type: 'TOGGLE' })
						}>
						{darkMode ? (
							<LightModeIcon className='icon' />
						) : (
							<DarkModeOutlinedIcon className='icon' />
						)}
					</div>

					<button
						className='logout-button'
						onClick={handleLogOut}>
						{' '}
						Log out{' '}
					</button>

					{/* {hoverIcon ? <h4>Logout</h4> : null} */}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
