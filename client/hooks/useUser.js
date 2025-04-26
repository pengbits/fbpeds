import { useState  } from "react";

const useUser = () => {
  const [user, setUser] = useState(null)
  
  const syncUser = async (url) => {
    const res = await fetch(url)
    const {user} = await res.json()
    setUser(user)
  }
  
  const fetchUser = () => {
    syncUser('/user')
  }
  
  const clearUser = () => {
    syncUser('/logout-user')
  }

  return {
    fetchUser,
    clearUser,
    user
  }
}
export default useUser