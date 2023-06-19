import {
	hotelColumns,
	roomColumns,
	userColumns,
} from './constants/dataTableSource';
import {
	UserDashboard,
	Home,
	List,
	Login,
	NewUser,
	NewHotel,
	Single,
	EditHotel,
	BookRoom,
} from './pages';
import { userInputs } from './constants/formSource';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDarkModeContext } from './context/DarkModeContext';
import { useAuthContext } from './context/AuthContext';
import './style/dark.scss';

const App = () => {
	const { darkMode } = useDarkModeContext();

	const ProtectedRoute = ({ children }) => {
		const { user } = useAuthContext();

		// if (!user) {
		//   return <Navigate to="/login" />;
		// }

		return children;
	};

	return (
		<div className={darkMode ? 'app dark' : 'app'}>
			<BrowserRouter>
				<Routes>
					<Route path='/'>
						<Route
							index
							element={
								<ProtectedRoute>
									{' '}
									<Home />{' '}
								</ProtectedRoute>
							}
						/>

						<Route path='login' element={<Login />} />
						<Route
							path='userDashboard'
							element={<UserDashboard />}
						/>
						<Route
							path='bookRoom'
							element={<BookRoom />}
						/>
						<Route path='users'>
							<Route
								index
								element={
									<ProtectedRoute>
										{' '}
										<List
											columns={
												userColumns
											}
										/>{' '}
									</ProtectedRoute>
								}
							/>
							<Route
								path=':id'
								element={
									<ProtectedRoute>
										{' '}
										<Single />{' '}
									</ProtectedRoute>
								}
							/>
							<Route
								path='new'
								element={
									<ProtectedRoute>
										<NewUser
											inputs={
												userInputs
											}
											title='Add New User'
										/>
									</ProtectedRoute>
								}
							/>
						</Route>

						<Route path='hotels'>
							<Route
								index
								element={
									<ProtectedRoute>
										{' '}
										<List
											columns={
												hotelColumns
											}
										/>{' '}
									</ProtectedRoute>
								}
							/>
							<Route
								path=':id'
								element={
									<ProtectedRoute>
										{' '}
										<Single />{' '}
									</ProtectedRoute>
								}
							/>
							<Route
								path='new'
								element={
									<ProtectedRoute>
										<NewHotel title='Add New Hotel' />
									</ProtectedRoute>
								}
							/>

							<Route
								path='edit/:id'
								element={
									<ProtectedRoute>
										<EditHotel title='Edit Hotel' />
									</ProtectedRoute>
								}
							/>
						</Route>

						<Route path='rooms'>
							<Route
								index
								element={
									<ProtectedRoute>
										{' '}
										<List
											columns={
												roomColumns
											}
										/>{' '}
									</ProtectedRoute>
								}
							/>
							<Route
								path=':id'
								element={
									<ProtectedRoute>
										{' '}
										<Single />{' '}
									</ProtectedRoute>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
