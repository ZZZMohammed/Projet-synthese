import './home.css';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import pic1 from '/img/team.webp';
import pic2 from '/img/centre.webp';
import pic3 from '/img/reception.webp';

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
      {/* Carousel Section */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        data-bs-pause="false"
      >
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={slide.id}
            >
              <img
                src={slide.image}
                className="d-block w-100 carousel-img"
                alt={`Slide ${slide.id}`}
                // loading="lazy"
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
            <h2 className="fw-bold mb-4 text-primary">
              Your Smile, Our Passion
            </h2>
            <p className="lead text-muted mb-3">
              Your first choice for a <strong>dental clinic in Tiznit</strong>.
              Whether it's the dentists, dental assistants, or technicians,
              they all share a philosophy of gentle approach and expertise.
            </p>
            <p className="text-muted mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ad
              fugit ipsa? Rem corrupti accusamus neque?
            </p>
            <Link to="/about" className="btn btn-outline-primary px-4 py-2">
              Learn More
            </Link>
          </div>

          {/* Image with Framer Motion */}
          <div className="col-lg-6 d-flex justify-content-center">
            <motion.img
              src="/img/4.webp"
              loading="lazy"
              className="img-fluid rounded-4 shadow-lg info-img"
              alt="Dental Clinic Interior"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
  <section className="py-5 bg-light text-center">
  <div className="container-fluid px-5"> {/* wider container */}
    <h2 className="text-primary mb-5">Our Services</h2>
    <div className="row justify-content-center g-4">
      <div className="col-12 col-md-4 col-lg-3">
        <div className="card shadow-sm border-0 p-4 h-100">
          <div className="card-body">
            <i className="bi bi-heart-pulse fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">General Dentistry</h5>
            <p className="text-muted small">
              Routine checkups, cleanings, and preventive care for your smile.
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4 col-lg-3">
        <div className="card shadow-sm border-0 p-4 h-100">
          <div className="card-body">
            <i className="bi bi-braces fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">Orthodontics</h5>
            <p className="text-muted small">
              Modern braces and aligners to straighten your teeth.
            </p>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4 col-lg-3">
        <div className="card shadow-sm border-0 p-4 h-100">
          <div className="card-body">
            <i className="bi bi-brightness-high fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">Cosmetic Dentistry</h5>
            <p className="text-muted small">
              Teeth whitening, veneers, and more to enhance your smile.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Banner Section */}
      <section className="text-white text-center py-5 banner-section">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to book your next visit?</h2>
          <p className="lead mb-4">
            Schedule your appointment with ease and let us take care of your smile.
          </p>
          <Link to="/list" className="btn btn-light btn-lg px-4 fw-semibold">
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Team Section */}
    <section className="container-fluid py-5 text-center px-5">
  <h2 className="fw-bold mb-5 text-primary">Meet Our Team</h2>
  <div className="row justify-content-center g-4">
    {/* Card 1 */}
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <img
          src="/img/team.webp"
          className="card-img-top rounded-top-4 team-img"
          alt="Dentist"
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="fw-bold">Dr. Sarah Benali</h5>
          <p className="text-muted">Chief Dentist</p>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <img
          src="/img/doctors/d1.webp"
          className="card-img-top rounded-top-4 team-img"
          alt="Assistant"
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="fw-bold">Amine El Idrissi</h5>
          <p className="text-muted">Dental Assistant</p>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <img
          src="/img/doctors/d2.webp"
          className="card-img-top rounded-top-4 team-img"
          alt="Technician"
          loading="lazy"
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
