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

      
     <div className="container-fluid pt-4"> 
  <div className="row g-0" > 
    
    <div className="col-md-6 " >
      <div className="p-5 text-center"> 
        <h2 className='fw-bold pb-3 '>Welcome to <span>Largou Dental Clinic</span></h2>
        <p>
          Your first choice for a <span className='fw-bold text-danger'>dental clinic in Tiznit</span>. Whether it's the dentists, dental assistants, or technicians, they all share a philosophy of gentle approach and expertise that you'll appreciate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi repellat architecto aut.
        </p>
      </div>
    </div>

    
    <div className="col-md-4" >
      <div className="p-5 text-center"> 
        <img src="/img/4.jpg" className="img-fluid rounded shadow"  alt="example" />
      </div>
    </div>
  </div>
</div>
    </>
  );
}
