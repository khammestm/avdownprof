
import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Loader2, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const HomePage = React.lazy(() => import('@/pages/HomePage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'));
const AdminDashboardPage = React.lazy(() => import('@/pages/AdminDashboardPage'));
const BlogPage = React.lazy(() => import('@/pages/BlogPage'));

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Error", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive"});
        return;
    }
    
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    if (subscribers.includes(email)) {
        toast({ title: "Already Subscribed", description: "This email is already subscribed.", variant: "destructive" });
        return;
    }
    subscribers.push(email);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    toast({ title: "Subscribed!", description: "Thank you for subscribing to Avdown.pro updates." });
    setEmail('');
  };

  return (
    <footer className="bg-background/70 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Copyright © {new Date().getFullYear()} H73R1DTM (Admin) for Avdown.pro. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Avdown.pro is a service for downloading publicly available media for personal use. Users are responsible for respecting copyright laws.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 items-center">
            <label htmlFor="email-subscribe" className="sr-only">Subscribe for updates</label>
            <Input 
              type="email" 
              id="email-subscribe"
              placeholder="Enter your email for updates" 
              className="bg-secondary/50 border-secondary" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="default" className="w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" /> Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
};


const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Navbar />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 md:py-6">
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
