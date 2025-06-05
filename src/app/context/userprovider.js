"use client";
import { Current } from "@/app/serveres/usersignup";
import UserContext from "../context/userContent";
import { useEffect, useState } from "react";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const currentUser = await Current();
      setUser(currentUser);
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    // Check for auth changes every 1 second (fallback)
    const interval = setInterval(fetchUser, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;