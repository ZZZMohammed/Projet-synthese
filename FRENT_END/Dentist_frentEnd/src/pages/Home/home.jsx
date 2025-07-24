import './home.css';
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="home-hero d-flex align-items-center justify-content-center text-white text-center">
        <div>
          <h1 className="display-3 fw-bold">Welcome to Largou Dental Clinic</h1>
          <p className="lead">Modern care with a gentle touch</p>
        </div>
      </div>

      {/* Info Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-lg-5 mb-4 mb-lg-0">
            <h2 className="display-5 fw-bold text-primary mb-4">
              Your Smile, Our Passion
            </h2>
            <p className="lead text-muted">
              Your first choice for a <strong>dental clinic in Tiznit</strong>.
              Whether it's the dentists, dental assistants, or technicians,
              they all share a philosophy of gentle approach and expertise.
            </p>
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Sapiente ad fugit ipsa? Rem corrupti accusamus neque?
            </p>
          </div>

          {/* Image */}
          <div className="col-lg-6 d-flex justify-content-center">
            <img
              src="/img/4.jpg"
              className="img-fluid rounded-4 shadow-lg styleimg"
              alt="Dental Clinic Interior"
            />
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="appointment-banner text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to book your next visit?</h2>
          <p className="lead mb-4">Schedule your appointment with ease and let us take care of your smile.</p>
          <Link to="/list" className="btn btn-primary btn-lg px-4">Book Appointment</Link>
        </div>
      </section>
    </>
  );
}
