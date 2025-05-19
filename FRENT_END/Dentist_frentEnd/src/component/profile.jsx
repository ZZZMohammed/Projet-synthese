import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/actions/aythAction';
import {Link} from 'react-router-dom' 


const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="alert alert-warning text-center shadow-sm">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Please login to view your profile
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-3">Loading your profile...</h4>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="alert alert-danger d-flex align-items-center shadow-sm">
              <i className="bi bi-exclamation-octagon-fill me-3 fs-4"></i>
              <div>
                <h5 className="alert-heading">Error loading profile</h5>
                <p className="mb-0">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <i className="bi bi-person-circle me-2 text-primary"></i>
                  Your Profile
                </h2>
                <div>
                  
                {user.role && (
                  <span className="badge bg-primary text-uppercase">
                    {user.role} 
                  </span>
                  
                  
                )}
                <Link className='btn btn-primary m-3' to={'/back'}>Back</Link>
                </div>
              </div>
              <hr className="mt-3" />
            </div>
            
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <h5 className="text-muted mb-3">
                      <i className="bi bi-person-fill me-2"></i>
                      Name
                    </h5>
                    <p className="fs-5 fw-semibold border-bottom pb-2">
                      {user.name || 'Not provided'}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-muted mb-3">
                      <i className="bi bi-envelope-fill me-2"></i>
                      Email
                    </h5>
                    <p className="fs-5 fw-semibold border-bottom pb-2">
                      {user.email}
                    </p>
                  </div>
                  
                  {user.phone && (
                    <div className="mb-4">
                      <h5 className="text-muted mb-3">
                        <i className="bi bi-telephone-fill me-2"></i>
                        Phone
                      </h5>
                      <p className="fs-5 fw-semibold border-bottom pb-2">
                        {user.phone}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="col-md-6">
                  {user.created_at && (
                    <div className="mb-4">
                      <h5 className="text-muted mb-3">
                        <i className="bi bi-calendar-check-fill me-2"></i>
                        Member Since
                      </h5>
                      <p className="fs-5 fw-semibold border-bottom pb-2">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                  
                  {/* Additional fields can be added here */}
                  <div className="mb-4">
                    <h5 className="text-muted mb-3">
                      <i className="bi bi-gear-fill me-2"></i>
                      Account Settings
                    </h5>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-pencil-fill me-2"></i>
                        Edit Profile
                      </button>
                      <button className="btn btn-outline-secondary">
                        <i className="bi bi-shield-lock-fill me-2"></i>
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-footer bg-white border-0 text-muted small">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;