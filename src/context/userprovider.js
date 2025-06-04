"use client";
import { Current } from "@/app/serveres/usersignup";
import UserContext from "@/context/userContent";
import { useEffect, useState } from "react";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null instead of undefined
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchUser();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider
