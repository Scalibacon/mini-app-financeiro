import { useEffect, useState } from "react"
import { getToken, isAuthenticated } from "../auth";

interface UserType {
  userId: number,
  username: string,
  accountId: number,
  balance: number
}

const useAuth = () => {
  const [ isUserLoading, setIsUserLoading ] = useState(true);
  const [ user, setUser ] = useState<UserType | undefined>();
  const [ error, setError ] = useState<string | undefined>();

  const fetchUserInfo = async () => {
    const response = await fetch('http://localhost:3333/account', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      },
    });
    const result = await response.json();

    setIsUserLoading(false);

    if(result.error){
      setError(result.error);
      return;
    }

    setUser(result.data);
  }

  useEffect(() => {
    if(!isAuthenticated()){
      setIsUserLoading(false);
      return;
    }

    fetchUserInfo();

  }, []);  

  return {
    isUserLoading,
    error,
    user
  }
}

export { useAuth }