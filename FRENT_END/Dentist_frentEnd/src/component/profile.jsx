
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/actions/aythAction';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector(state => state.auth);

  // Load profile on component mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="alert alert-warning">
        Please login to view your profile
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Error loading profile: {error}
      </div>
    );
  }

  return (
    <div className="profile-container p-4">
      <h2 className="mb-4">Your Profile</h2>
      
      {user && (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <h5 className="text-muted">Name</h5>
                  <p className="fs-5">{user.name || 'Not provided'}</p>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-muted">Email</h5>
                  <p className="fs-5">{user.email}</p>
                </div>
                
                {user.phone && (
                  <div className="mb-3">
                    <h5 className="text-muted">Phone</h5>
                    <p className="fs-5">{user.phone}</p>
                  </div>
                )}
              </div>
              
              <div className="col-md-6">
                {/* Add any additional profile fields here */}
                {user.role && (
                  <div className="mb-3">
                    <h5 className="text-muted">Account Type</h5>
                    <p className="fs-5 text-capitalize">{user.role}</p>
                  </div>
                )}
                
                {user.created_at && (
                  <div className="mb-3">
                    <h5 className="text-muted">Member Since</h5>
                    <p className="fs-5">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;