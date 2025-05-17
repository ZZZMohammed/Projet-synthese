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

      
   <div className="container-fluid px-0">
  <div className="row g-0 align-items-center">
    {/* Text Content Column */}
    <div className="col-lg-6 col-md-5">
      <div className="p-4 p-lg-5">
        <h3 className="display-5 fw-bold text-primary mb-4 mx-auto" style={{maxWidth: "500px"}}>
          Welcome to <span className="">Largou Dental Clinic</span>
        </h3>
        <p className="lead text-muted mb-4 mx-auto" style={{maxWidth: "500px"}}>
          Your first choice for a <span className="fw-bold">dental clinic in Tiznit</span>. 
          Whether it's the dentists, dental assistants, or technicians, they all share a philosophy 
          of gentle approach and expertise that you'll appreciate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem corrupti accusamus neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente ad fugit ipsa?
        </p>
        
      </div>
    </div>

    {/* Image Column */}
    <div className="col-lg-5 col-md-5">
      <div className="p-3 p-lg-5">
        <img 
          src="/img/4.jpg" 
          className="img-fluid rounded-3 shadow-lg" 
          alt="Dental Clinic Interior"
          style={{
            maxHeight: "400px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
      </div>
    </div>
  </div>
</div>
    </>
  );
}
