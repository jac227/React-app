import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsers } from '../store/userSlice';
import UserCard from './UserCard';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to fetch users.</p>;
  }

  return (
    <ListContainer>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ListContainer>
  );
};

export default UserList;

