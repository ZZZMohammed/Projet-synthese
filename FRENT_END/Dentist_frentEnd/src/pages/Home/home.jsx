import './home.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="home-hero d-flex align-items-center justify-content-center text-white text-center">
        <div>
          {/* <h1 className="display-4">Welcome to the Home Page</h1>
          <p className="lead">Your journey starts here.</p> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Text on the left */}
          <div className="col-md-3 order-md-1 order-2">
            <h2 className='fw-bold pb-3'>Welcome to Largou Dental Clinic</h2>
            <p>
              Your first choice for a <span className='fw-bold text-danger'>dental clinic in Tiznit</span>. Whether it's the dentists, dental assistants, or technicians, they all share a philosophy of gentle approach and expertise that you'll appreciate.
            </p>
          </div>

          {/* Image on the right */}
          <div className="col-md-6 order-md-2 order-1 text-center containar">
            <img src="/img/4.jpg" className="img-fluid rounded shadow styleimg" alt="example" />
          </div>
        </div>
      </div>
    </>
  );
}
