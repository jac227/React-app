import React from 'react';
import { User } from '../store/userSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
`;

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      <h3>{user.first_name} {user.last_name}</h3>
      <p>{user.email}</p>
      <Link to={`/user/${user.id}`}>View Details</Link>
    </Card>
  );
};

export default UserCard;

