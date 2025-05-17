
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

const ADMIN_USERNAME = "H73R1DTM";
const ADMIN_PASSWORD = "Revengemh1993@";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username === ADMIN_USERNAME) {
        parsedUser.isAdmin = true; 
      }
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const adminUser = { username, isAdmin: true, status: 'approved', id: 'admin_user' };
      localStorage.setItem('authUser', JSON.stringify(adminUser));
      setUser(adminUser);
      toast({ title: "Login Successful", description: "Welcome Admin!" });
      return true;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      if (foundUser.status === 'pending') {
        toast({ title: "Login Failed", description: "Your account is pending approval.", variant: "destructive" });
        return false;
      }
      if (foundUser.status === 'approved') {
        const regularUser = { ...foundUser, isAdmin: false };
        localStorage.setItem('authUser', JSON.stringify(regularUser));
        setUser(regularUser);
        toast({ title: "Login Successful", description: `Welcome back, ${regularUser.username}!` });
        return true;
      }
    }
    
    toast({ title: "Login Failed", description: "Invalid username or password.", variant: "destructive" });
    return false;
  };

  const signup = (username, password) => {
    if (username === ADMIN_USERNAME) {
      toast({ title: "Signup Failed", description: "This username is reserved.", variant: "destructive" });
      return false;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
      toast({ title: "Signup Failed", description: "Username already exists.", variant: "destructive" });
      return false;
    }
    const newUser = { username, password, isAdmin: false, status: 'pending', id: Date.now().toString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    toast({ title: "Signup Successful", description: "Your account has been created and is pending approval." });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
  };

  const getUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  };

  const approveUser = (userId) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map(u => u.id === userId ? { ...u, status: 'approved' } : u);
    localStorage.setItem('users', JSON.stringify(users));
    toast({ title: "User Approved", description: "User account has been approved." });
    return users;
  };

  const updateUser = (updatedUser) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(users));
    if (user && user.id === updatedUser.id) {
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    return users;
  };
  
  const value = {
    user,
    isAdmin: user?.isAdmin || false,
    isLoggedIn: !!user,
    isLoading,
    login,
    signup,
    logout,
    getUsers,
    approveUser,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
