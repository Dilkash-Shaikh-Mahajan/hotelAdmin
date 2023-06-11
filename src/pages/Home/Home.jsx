import {
	Sidebar,
	Navbar,
	Widget,
	Featured,
	Chart,
	TableList,
} from '../../components';
import './Home.scss';

// this component call from ==> 🟨 ../App.js 🟨 React <Router />
const Home = () => {
	return (
		<div className='home'>
			<Sidebar />

			<div className='homContainer'>
				<Navbar />

				<div className='widgets'>
					<Widget type='user' />
					<Widget type='order' />
					<Widget type='earning' />
					<Widget type='balance' />
				</div>
			</div>
		</div>
	);
};

export default Home;
