import React from 'react';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer_content'>
				<div className='container'>
					<div className='row footer_row'>
						<div className='col-lg-4'>
							<div className='footer_title'>
								Our Address
							</div>
							<div className='footer_list'>
								<ul>
									<li>Beach Str. 345</li>
									<li>67559 Miami</li>
									<li>USA</li>
								</ul>
							</div>
						</div>

						<div className='col-lg-4'>
							<div className='footer_title'>
								Reservations
							</div>
							<div className='footer_list'>
								<ul>
									<li>Tel: 345 5667 889</li>
									<li>
										Fax; 6783 4567 889
									</li>
									<li>
										reservations@hotelriver.com
									</li>
								</ul>
							</div>
						</div>

						<div className='col-lg-4'>
							<div className='footer_title'>
								Newsletter
							</div>
							<div className='newsletter_container'>
								<form
									action='#'
									className='newsletter_form'
									id='newsletter_form'>
									<input
										type='email'
										className='newsletter_input'
										placeholder='Your email address'
										required='required'
									/>
									<button className='newsletter_button'>
										Subscribe
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='copyright'>
				Copyright &copy;
				<script>
					document.write(new Date().getFullYear());
				</script>{' '}
				All rights reserved | This template is made with{' '}
				<i className='fa fa-heart-o' aria-hidden='true'></i> by{' '}
				<a href='https://colorlib.com' target='_blank'>
					Colorlib
				</a>
			</div>
		</footer>
	);
};

export default Footer;
