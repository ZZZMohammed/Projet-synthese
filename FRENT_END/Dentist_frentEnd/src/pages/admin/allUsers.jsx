import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions/aythAction'; 
import { Spinner, Alert, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AllUsers() {
  const dispatch = useDispatch();

  const { users, usersLoading, usersError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Extract the actual users array from paginated data safely
  const userList = users?.data || [];

  console.log('usersLoading:', usersLoading);
  console.log('usersError:', usersError);
  console.log('users:', users);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">All Users</h1>
      <Link className='btn btn-primary m-4 fw-bold' to={'/back'}>Back</Link>

      {/* Loading Spinner */}
      {usersLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error Message */}
      {usersError && (
        <Alert variant="danger" className="text-center">
          {usersError}
        </Alert>
      )}

      {/* Users Table */}
      {!usersLoading && !usersError && userList.length > 0 && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {/* Add more fields if needed */}
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={user.id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      )}

      {/* No Users Found Message */}
      {!usersLoading && !usersError && userList.length === 0 && (
        <p className="text-center">No users found.</p>
      )}
    </Container>
  );
}
