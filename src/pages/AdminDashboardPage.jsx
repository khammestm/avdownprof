
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserCheck, Users, ShieldAlert, BarChart3, FileText, Edit, Trash2, PlusCircle, Settings2, Eye, DownloadCloud, Search, TrendingUp, DollarSign, Settings, Activity, Users2, MousePointerClick, MailOpen, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import DownloadHistory from '@/components/DownloadHistory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateChartData = (period) => {
  const data = [];
  let numPoints;
  let unit;
  
  switch(period) {
    case 'day': numPoints = 24; unit = 'Hour'; break;
    case 'week': numPoints = 7; unit = 'Day'; break;
    case 'month': numPoints = 30; unit = 'Day'; break;
    case 'year': numPoints = 12; unit = 'Month'; break;
    default: numPoints = 7; unit = 'Day';
  }

  for (let i = 0; i < numPoints; i++) {
    data.push({
      name: `${unit} ${i + 1}`,
      views: Math.floor(Math.random() * 1000) + 50,
      income: parseFloat((Math.random() * 100).toFixed(2)),
    });
  }
  return data;
};

const StatCard = ({ title, value, icon, trend, period, onTabChange, tabName }) => {
  const IconComponent = icon;
  return (
    <Card className="glass-card cursor-pointer hover:border-primary/50" onClick={() => onTabChange && tabName && onTabChange(tabName)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="text-xs text-muted-foreground">{trend} from last {period}</p>}
      </CardContent>
    </Card>
  );
};

const AdminDashboardPage = () => {
  const { isAdmin, getUsers, approveUser, updateUser } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [activeAdminTab, setActiveAdminTab] = useState("main");
  const [subscribers, setSubscribers] = useState([]);

  const [viewPeriod, setViewPeriod] = useState('week');
  const [incomePeriod, setIncomePeriod] = useState('week');

  const viewData = useMemo(() => generateChartData(viewPeriod), [viewPeriod]);
  const incomeData = useMemo(() => generateChartData(incomePeriod), [incomePeriod]);
  
  const totalVisitors = 34567; 

  useEffect(() => {
    if (isAdmin) {
      setAllUsers(getUsers());
      const storedSubscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
      setSubscribers(storedSubscribers);
    }
  }, [isAdmin, getUsers]);

  const handleApproveUser = (userId) => {
    const updatedUsers = approveUser(userId);
    setAllUsers(updatedUsers);
  };
  
  const filteredUsers = allUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-12 flex flex-col items-center gap-4"
      >
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </motion.div>
    );
  }

  const PlaceholderContent = ({ title, icon, children }) => {
    const IconComponent = icon;
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><IconComponent className="h-6 w-6 text-primary" />{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children || <p className="text-muted-foreground">Detailed information and management tools for {title.toLowerCase()} will be available here soon. This section is currently under development.</p>}
        </CardContent>
      </Card>
    );
  };
  
  const chartPeriodControls = (period, setPeriod) => (
    <div className="flex gap-1 mb-2">
      {['day', 'week', 'month', 'year'].map(p => (
        <Button key={p} variant={period === p ? "default" : "outline"} size="xs" onClick={() => setPeriod(p)}>{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
      ))}
    </div>
  );


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-8"
    >
      <Card className="glass-card mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-primary">Admin Control Panel</CardTitle>
              <CardDescription>Manage Avdown.pro settings, users, content, and advertisements.</CardDescription>
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Site Visitors</p>
                <p className="text-2xl font-bold text-primary">{totalVisitors.toLocaleString()}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeAdminTab} onValueChange={setActiveAdminTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-6">
          <TabsTrigger value="main"><BarChart3 className="mr-2 h-4 w-4"/>Main</TabsTrigger>
          <TabsTrigger value="analytics"><TrendingUp className="mr-2 h-4 w-4"/>Analytics</TabsTrigger>
          <TabsTrigger value="users"><Users className="mr-2 h-4 w-4"/>Users</TabsTrigger>
          <TabsTrigger value="history"><DownloadCloud className="mr-2 h-4 w-4"/>History</TabsTrigger>
          <TabsTrigger value="blog"><FileText className="mr-2 h-4 w-4"/>Blog Posts</TabsTrigger>
          <TabsTrigger value="ads"><Settings2 className="mr-2 h-4 w-4"/>Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard title="Today's Visitors" value="1,280" icon={Users} trend="+15.2%" period="day" onTabChange={setActiveAdminTab} tabName="analytics" />
            <StatCard title="Active Users" value="650" icon={Activity} trend="-2.1%" period="session" onTabChange={setActiveAdminTab} tabName="users" />
            <StatCard title="Ad Clicks Today" value="350" icon={MousePointerClick} trend="+8.0%" period="day" onTabChange={setActiveAdminTab} tabName="ads" />
            <StatCard title="Pending Approvals" value={allUsers.filter(u=>u.status==='pending').length.toString()} icon={UserCheck} onTabChange={setActiveAdminTab} tabName="users" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Website Views</CardTitle>
                {chartPeriodControls(viewPeriod, setViewPeriod)}
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Legend wrapperStyle={{fontSize: "12px"}} />
                    <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} dot={{r:2}} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
             <Card className="glass-card">
              <CardHeader>
                <CardTitle>Ad Income</CardTitle>
                 {chartPeriodControls(incomePeriod, setIncomePeriod)}
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} unit="$" />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={{r:2}} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <PlaceholderContent title="Detailed Website Analytics" icon={TrendingUp}>
            <div className="space-y-6">
              <Card className="bg-secondary/20"><CardHeader><CardTitle className="text-lg">Traffic Sources</CardTitle></CardHeader><CardContent><p>Direct, Referral, Organic Search, Social Media breakdown (Placeholder)</p></CardContent></Card>
              <Card className="bg-secondary/20"><CardHeader><CardTitle className="text-lg">User Demographics</CardTitle></CardHeader><CardContent><p>Country, Device, Browser breakdown (Placeholder)</p></CardContent></Card>
              <Card className="bg-secondary/20"><CardHeader><CardTitle className="text-lg">Content Performance</CardTitle></CardHeader><CardContent><p>Most viewed pages, Bounce rate, Time on page (Placeholder)</p></CardContent></Card>
              <Card className="bg-secondary/20"><CardHeader><CardTitle className="text-lg">Download Statistics</CardTitle></CardHeader><CardContent><p>Downloads by platform, by type, popular links (Placeholder)</p></CardContent></Card>
              <Card className="bg-secondary/20"><CardHeader><CardTitle className="text-lg">Conversion Rates</CardTitle></CardHeader><CardContent><p>Subscription conversion, Ad click-through rates (Placeholder)</p></CardContent></Card>
            </div>
          </PlaceholderContent>
        </TabsContent>

        <TabsContent value="users">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6"/>User Management</CardTitle>
              <CardDescription>View, approve, and manage user accounts. Admin account (H73R1DTM) is not listed here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              {filteredUsers.filter(u => u.username !== 'H73R1DTM').length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-semibold">Username</th>
                        <th className="p-3 text-left font-semibold">Password (Hidden)</th>
                        <th className="p-3 text-left font-semibold">Status</th>
                        <th className="p-3 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.filter(u => u.username !== 'H73R1DTM').map(user => (
                        <tr key={user.id} className="border-b border-secondary/50 hover:bg-secondary/20">
                          <td className="p-3">{user.username}</td>
                          <td className="p-3 text-muted-foreground">********</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-3">
                            {user.status === 'pending' && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline"><UserCheck className="mr-2 h-4 w-4"/>Approve</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Approve User?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to approve the user "{user.username}"?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleApproveUser(user.id)}>Approve</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No users found or matching search criteria.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
           <Card className="glass-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><DownloadCloud className="h-6 w-6"/>Download History Management</CardTitle>
                <CardDescription>View and manage all download links initiated on the website. You can export or delete history items.</CardDescription>
            </CardHeader>
            <CardContent>
                <DownloadHistory />
                <div className="mt-6 flex justify-end">
                    <Button variant="outline">
                        <DownloadCloud className="mr-2 h-4 w-4" /> Export as XML (Coming Soon)
                    </Button>
                </div>
            </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="blog">
          <PlaceholderContent title="Blog Post Management" icon={FileText}>
            <div className="space-y-4">
              <Button><PlusCircle className="mr-2 h-4 w-4"/>Create New Post (Placeholder)</Button>
              <p className="text-muted-foreground">List of existing blog posts with options to edit, delete, manage SEO keywords, and view analytics for each post will appear here.</p>
              <Card className="bg-secondary/20">
                <CardHeader><CardTitle className="text-lg">Example Post Title</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">Excerpt of the blog post...</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Edit className="mr-1 h-3 w-3"/>Edit</Button>
                    <Button variant="destructive" size="sm"><Trash2 className="mr-1 h-3 w-3"/>Delete</Button>
                    <Button variant="ghost" size="sm"><Eye className="mr-1 h-3 w-3"/>View Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </PlaceholderContent>
        </TabsContent>

        <TabsContent value="ads">
          <PlaceholderContent title="Advertisement Management" icon={Settings2}>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-secondary/20">
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><MousePointerClick />Ad Click Tracking</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <p>Left Sidebar Ad Clicks: <strong>125</strong></p>
                  <p>Right Sidebar Ad Clicks: <strong>98</strong></p>
                  <p>Blog Ad 1 Clicks: <strong>75</strong></p>
                  <p>Blog Ad 2 Clicks: <strong>60</strong></p>
                  <div className="flex items-center gap-2 mt-2">
                    <Label htmlFor="cpcRate" className="whitespace-nowrap">Rate per Click ($):</Label>
                    <Input type="number" id="cpcRate" defaultValue="0.05" className="w-24 h-8"/>
                  </div>
                  <p className="mt-2 font-semibold">Estimated Income: $17.90 (Placeholder)</p>
                </CardContent>
              </Card>
               <Card className="bg-secondary/20">
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><MailOpen />Email Subscribers ({subscribers.length})</CardTitle></CardHeader>
                <CardContent>
                  {subscribers.length > 0 ? (
                    <ul className="max-h-48 overflow-y-auto text-sm space-y-1">
                      {subscribers.map((email, index) => <li key={index} className="truncate">{email}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No subscribers yet.</p>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-secondary/20 md:col-span-2">
                <CardHeader><CardTitle className="text-lg">Ad Script/Image Management</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="leftAdScript">Left Sidebar Ad Code/Image URL</Label>
                    <Textarea id="leftAdScript" placeholder="Paste ad script or image URL here" className="mt-1"/>
                  </div>
                   <div>
                    <Label htmlFor="rightAdScript">Right Sidebar Ad Code/Image URL</Label>
                    <Textarea id="rightAdScript" placeholder="Paste ad script or image URL here" className="mt-1"/>
                  </div>
                  <Button>Save Ad Settings (Placeholder)</Button>
                </CardContent>
              </Card>
            </div>
          </PlaceholderContent>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminDashboardPage;
