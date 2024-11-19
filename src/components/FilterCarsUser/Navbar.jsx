import { useState, useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import imageLogo from '../../assets/image-removebg-preview.png';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/auth';
import { useQuery } from '@tanstack/react-query';
import { profile } from '../../service/auth';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, token } = useSelector(state => state.auth);

	// Fetch user profile data using TanStack Query
	const {
		data: userProfile,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: profile,
		enabled: !!token, // Only fetch if token exists
		onSuccess: data => dispatch(setUser(data.data)),
		onError: () => {
			dispatch(setUser(null));
			dispatch(setToken(null));
			navigate({ to: '/login' });
		},
	});

	// Toggle menu
	const toggleMenu = () => {
		setIsOpen(!isOpen);
		document.body.style.overflow = isOpen ? 'auto' : 'hidden';
	};

	// Handle scroll for navbar effect
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Logout handler
	const logout = event => {
		event.preventDefault();
		dispatch(setUser(null));
		dispatch(setToken(null));
		navigate({ to: '/' });
	};

	if (isLoading) return <nav>Loading...</nav>;
	if (isError) return <nav>Error fetching profile</nav>;

	return (
		<nav className={`navbar navbar-expand-md fixed-top ${isScrolled ? 'bg-light shadow-sm' : 'bg-transparent'}`}>
			<div className="container my-2">
				{/* Brand Logo */}
				<a className="navbar-brand" onClick={() => navigate({ to: '/' })} style={{ cursor: 'pointer' }}>
					<img src={imageLogo} alt="Logo" height="36" />
				</a>

				{/* Navbar Toggler */}
				<button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="offcanvasNavbar" aria-expanded={isOpen} aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Offcanvas */}
				<div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasNavbar" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
					<div className="offcanvas-header">
						<h5 className="offcanvas-title">Menu</h5>
						<button type="button" className="btn-close" onClick={toggleMenu} aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						<ul className="navbar-nav ms-auto">
							{/* Navigation Links */}

							{/* Conditional Rendering for User Authentication */}
							{!user ? (
								<>
									<li className="nav-item">
										<button className="btn btn-success ms-2" onClick={() => navigate({ to: '/login' })}>
											Login
										</button>
									</li>
									<li className="nav-item">
										<button className="btn btn-success ms-2" onClick={() => navigate({ to: '/register' })}>
											Register
										</button>
									</li>
								</>
							) : (
								<li className="nav-item">
									<Dropdown align="end">
										<Dropdown.Toggle as="a" className="nav-link" style={{ cursor: 'pointer' }}>
											<Image
												src={userProfile?.data?.profile_picture}
												fluid
												style={{
													marginRight: '10px',
													width: '30px',
													height: '30px',
													borderRadius: '50%',
												}}
											/>
											{userProfile?.data?.name}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item as={Link} to="/profile">
												My Profile
											</Dropdown.Item>
											<Dropdown.Item as={Link} to="/settings">
												Settings
											</Dropdown.Item>
											<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
