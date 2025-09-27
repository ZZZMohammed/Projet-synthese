import './home.css';
import { Link } from 'react-router-dom';

import pic1 from '../../../public/img/team.jpg';
import pic2 from '../../../public/img/centre.jpg';
import pic3 from '../../../public/img/reception.jpg';

export default function Home() {
  const slides = [
    {
      id: 1,
      image: pic1,
      title: 'Welcome to Our Service',
      description: 'Discover amazing features and benefits.',
    },
    {
      id: 2,
      image: pic2,
      title: 'Book Instantly',
      description: 'Seamless booking experience at your fingertips.',
    },
    {
      id: 3,
      image: pic3,
      title: 'Enjoy Your Journey',
      description: 'We provide quality service for all your needs.',
    },
  ];

  return (
    <>
      {/* Hero Section (KEPT AS IS) */}
      <div
        id="carouselExample"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={slide.id}
            >
              <img
                src={slide.image}
                className="d-block w-100"
                alt={`Slide ${slide.id}`}
              />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          {/* Text Content */}
          <div className="col-lg-5">
            <h2 className="fw-bold mb-4" style={{ color: '#2d7d9a' }}>
              Your Smile, Our Passion
            </h2>
            <p className="lead text-muted mb-3">
              Your first choice for a <strong>dental clinic in Tiznit</strong>.
              Whether it's the dentists, dental assistants, or technicians,
              they all share a philosophy of gentle approach and expertise.
            </p>
            <p className="text-muted mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              ad fugit ipsa? Rem corrupti accusamus neque?
            </p>
            <Link to="/about" className="btn btn-outline-primary px-4 py-2">
              Learn More
            </Link>
          </div>

          {/* Image */}
          <div className="col-lg-6 d-flex justify-content-center">
            <img
              src="/img/4.webp"
               loading="lazy"
              className="img-fluid rounded-4 shadow-lg"
              alt="Dental Clinic Interior"
              style={{
                maxHeight: '380px',
                width: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5" style={{ color: '#2d7d9a' }}>
            Our Services
          </h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="p-4 shadow-sm rounded-4 bg-white h-100">
                <i className="bi bi-heart-pulse fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold mb-2">General Dentistry</h5>
                <p className="text-muted">
                  Routine checkups, cleanings, and preventive care for your
                  smile.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 shadow-sm rounded-4 bg-white h-100">
                <i className="bi bi-braces fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold mb-2">Orthodontics</h5>
                <p className="text-muted">
                  Modern braces and aligners to straighten your teeth.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 shadow-sm rounded-4 bg-white h-100">
                <i className="bi bi-brightness-high fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold mb-2">Cosmetic Dentistry</h5>
                <p className="text-muted">
                  Teeth whitening, veneers, and more to enhance your smile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section
        className="text-white text-center py-5"
        style={{ backgroundColor: '#2d7d9a' }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to book your next visit?</h2>
          <p className="lead mb-4">
            Schedule your appointment with ease and let us take care of your
            smile.
          </p>
          <Link to="/list" className="btn btn-light btn-lg px-4 fw-semibold">
            Book Appointment
          </Link>
        </div>
      </section>

     {/* Team Section */}
<section className="container py-5 text-center">
  <h2 className="fw-bold mb-5" style={{ color: '#2d7d9a' }}>
    Meet Our Team
  </h2>
  <div className="row g-4">
    <div className="col-md-3">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <img
          src="/img/team.jpg"
           loading="lazy"
          className="card-img-top rounded-top-4"
          alt="Dentist"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="fw-bold">Dr. Sarah Benali</h5>
          <p className="text-muted">Chief Dentist</p>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <img
          src="/img/doctors/d1.jpeg"
           loading="lazy"
          className="card-img-top rounded-top-4"
          alt="Assistant"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="fw-bold">Amine El Idrissi</h5>
          <p className="text-muted">Dental Assistant</p>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <img
          src="/img/doctors/d2.jpeg"
           loading="lazy"
          className="card-img-top rounded-top-4"
          alt="Technician"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="fw-bold">Nadia Rami</h5>
          <p className="text-muted">Technician</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
}
