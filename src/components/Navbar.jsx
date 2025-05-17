
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Shield, LayoutDashboard, Home, BookOpen, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-background/80 backdrop-blur-md shadow-lg p-4 sticky top-0 z-40 w-full"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <Download /> Avdown.pro
        </Link>
        <div className="space-x-2 flex items-center">
          <Button variant="ghost" asChild>
            <Link to="/"><Home className="mr-2 h-4 w-4" />Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/blog"><BookOpen className="mr-2 h-4 w-4" />Blog</Link>
          </Button>
          {isLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
              </Button>
              {isAdmin && (
                 <Button variant="ghost" asChild>
                    <Link to="/admin"><Shield className="mr-2 h-4 w-4" />Admin Panel</Link>
                 </Button>
              )}
              <span className="text-sm text-muted-foreground hidden sm:inline">Hi, {user.username}!</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Button variant="default" asChild>
              <Link to="/login"><User className="mr-2 h-4 w-4" />Login / Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
