import { useNavigate } from '@tanstack/react-router'; // Impor useNavigate
import carImage from '../../assets/img_car.png';

const Hero = () => {
	const navigate = useNavigate(); // Hook untuk navigasi

	return (
		<section className="bg-light py-5 mt-5">
			<div className="container d-flex flex-column flex-md-row align-items-center justify-content-between mt-4">
				<div className="row">
					{/* Kolom Teks */}
					<div className="col-12 col-md-6 mb-4 mb-md-0 pe-md-4">
						<h1 className="fs-1 display-4 fw-bold text-dark mb-3">
							Sewa & Rental Mobil Terbaik di kawasan <span className="text-dark">(Lokasimu)</span>
						</h1>
						<p className="text-muted mb-4">Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
						<button onClick={() => navigate({ to: '/cars' })} className="btn btn-success btn-lg">
							Mulai Sewa Mobil
						</button>
					</div>

					{/* Kolom Gambar */}
					<div className="col-12 col-md-6 text-center">
						<img src={carImage} alt="Car" className="img-fluid" style={{ maxWidth: '90%', height: 'auto' }} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
