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
    // Initial fetch
    fetchUser();

    // Event-based updates instead of polling
    const handleFocus = () => {
      fetchUser();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;