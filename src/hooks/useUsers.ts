import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUserById } from '../store/userSlice';
import { RootState, AppDispatch } from '../store';

export const useUsers = (page: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  return { users, status };
};

export const useUser = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  return { selectedUser, status };
};

