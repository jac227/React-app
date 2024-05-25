import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { fetchUserById } from '../store/userSlice';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
`;

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, status } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to fetch user details.</p>;
  }

  if (!selectedUser) {
    return <p>No user selected.</p>;
  }

  return (
    <DetailsContainer>
      <Avatar src={selectedUser.avatar} alt={`${selectedUser.first_name} ${selectedUser.last_name}`} />
      <h2>{selectedUser.first_name} {selectedUser.last_name}</h2>
      <p>{selectedUser.email}</p>
    </DetailsContainer>
  );
};

export default UserDetails;

