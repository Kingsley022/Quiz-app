import { useQuery } from 'react-query';
import axios from 'axios';

export const useRegisterUser = (data) => {
  return useQuery(['register'], async () => {
    const response = await axios.post('http://localhost:5000/api/users', data);
    return response.data;
  });
}