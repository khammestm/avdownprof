
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, CheckCircle, Clock, Settings, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ComingSoonFeature = ({ icon, title, description }) => {
  const IconComponent = icon;
  return (
    <div className="p-4 bg-secondary/30 rounded-lg border border-secondary/50 flex items-start gap-4">
      <IconComponent className="h-8 w-8 text-primary mt-1" />
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        <span className="text-xs text-primary/70">(Coming Soon)</span>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-12 px-4"
    >
      <Card className="max-w-3xl mx-auto glass-card">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <UserCircle className="h-8 w-8 text-primary" />
            Welcome, {user.username}!
          </CardTitle>
          <CardDescription>This is your personal dashboard. Manage your account and explore features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Account Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-secondary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.status === 'approved' ? (
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle className="h-5 w-5" />
                      <span>Your account is approved and active.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Clock className="h-5 w-5" />
                      <span>Your account is pending admin approval.</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              {isAdmin && (
                <Card className="bg-primary/10 border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Admin Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">You have full administrative privileges.</p>
                    <Button asChild size="sm">
                      <Link to="/admin"><Shield className="mr-2 h-4 w-4"/>Go to Admin Panel</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Upcoming Features</h3>
            <div className="space-y-4">
              <ComingSoonFeature 
                icon={Settings}
                title="Personalized Settings"
                description="Customize your download preferences and interface themes."
              />
              <ComingSoonFeature 
                icon={Zap}
                title="Batch Downloads"
                description="Queue multiple URLs for downloading at once."
              />
               <ComingSoonFeature 
                icon={Clock}
                title="Extended Download History"
                description="Access a more detailed and filterable download history."
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              We are constantly working to improve Avdown.pro. Stay tuned for more exciting updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardPage;
