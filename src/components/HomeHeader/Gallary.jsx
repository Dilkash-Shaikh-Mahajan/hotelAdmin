import React from 'react';

const Gallary = () => {
	return (
		<>
			<div className='about' style={{ marginTop: '50px' }}>
				<div className='container'>
					<div className='text-center'>
						<div className='about_content'>
							<div className='about_title'>
								<h2>
									The River / 10 years of
									excellence
								</h2>
							</div>
							<div className='about_text'>
								<p>
									Vestibulum ante ipsum
									primis in faucibus orci
									luctus et ultrices posuere
									cubilia Curae; Suspendisse
									nec faucibus velit.
									Quisque eleifend orci
									ipsum, a bibendum lacus
									suscipit sit. Vestibulum
									ante ipsum primis in
									faucibus orci luctus et
									ultrices posuere cubilia
									Curae; Suspendisse nec
									faucibus velit. Quisque
									eleifend orci ipsum, a
									bibendum lacus suscipit
									sit. Vestibulum ante ipsum
									primis in faucibus orci
									luctus et ultrices posuere
									cubilia Curae; Suspendisse
									nec faucibus velit.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div
					className='gallery  w-100 h-50 d-flex justify-content-center'
					style={{
						marginBottom: '70px',
						marginTop: '20px',
					}}>
					<div className=' w-100 d-flex g-0 h-100'>
						<div className='w-25 h-50'>
							<img
								src={`/images/gallery_1.jpg`}
								className='img-fluid'
								alt='GallaryImage'
							/>
						</div>
						<div className='w-25 h-50'>
							<img
								src={`/images/gallery_2.jpg`}
								className='img-fluid'
								alt='GallaryImage'
							/>
						</div>
						<div className='w-25 h-50'>
							<img
								src={`/images/gallery_3.jpg`}
								className='img-fluid'
								alt='GallaryImage'
							/>
						</div>
						<div className='w-25 h-50'>
							<img
								src={`/images/gallery_4.jpg`}
								className='img-fluid'
								alt='GallaryImage'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Gallary;
