
import React from "react";
import { motion } from "framer-motion";
import { Server, Code, Terminal, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const BackendInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <span>Backend Integration</span>
          </CardTitle>
          <CardDescription>
            Connect your existing script to this frontend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-secondary/30 p-4 border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-4 w-4" />
              <h3 className="font-medium">VPS Integration</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              To connect your existing script on your VPS, you'll need to:
            </p>
            <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
              <li>Set up an API endpoint on your VPS that accepts the URL and platform</li>
              <li>Configure CORS to allow requests from this web app</li>
              <li>Update the form submission handler to call your API</li>
            </ol>
          </div>
          
          <div className="rounded-md bg-secondary/30 p-4 border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4" />
              <h3 className="font-medium">Example API Integration</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Replace the form submission code with:
            </p>
            <pre className="text-xs bg-black/50 p-2 rounded overflow-x-auto">
              {`// In DownloadForm.jsx
const handleSubmit = async (e, type) => {
  e.preventDefault();
  
  if (!url || !platform) {
    toast({ title: "Error", description: "Please fill all fields" });
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('https://your-vps-api.com/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, platform, type })
    });
    
    if (!response.ok) throw new Error('Download failed');
    
    const data = await response.json();
    
    // Save to history
    const history = JSON.parse(localStorage.getItem("downloadHistory") || "[]");
    history.push({
      id: Date.now(),
      url,
      platform,
      type,
      date: new Date().toISOString(),
    });
    localStorage.setItem("downloadHistory", JSON.stringify(history));
    
    // Trigger download with the returned URL
    window.location.href = data.downloadUrl;
    
    toast({ title: "Success!", description: \`Your \${type} is ready\` });
  } catch (error) {
    toast({
      title: "Download failed",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};`}
            </pre>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <p>
              This frontend is ready to connect to your existing script. Just update the API endpoint.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BackendInfo;
