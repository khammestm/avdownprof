
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Youtube, Instagram, Facebook, Twitter, Instagram as TikTok, Music, Video, Download, Link as LinkIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const platforms = [
  { id: "youtube", name: "YouTube", icon: Youtube, color: "text-red-500" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-500" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "text-sky-400" },
  { id: "tiktok", name: "TikTok", icon: TikTok, color: "text-purple-500" }
];

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (!platform) {
      toast({
        title: "Error",
        description: "Please select a platform",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a successful download after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the download history in localStorage
      const history = JSON.parse(localStorage.getItem("downloadHistory") || "[]");
      history.push({
        id: Date.now(),
        url,
        platform,
        type,
        date: new Date().toISOString(),
      });
      localStorage.setItem("downloadHistory", JSON.stringify(history));
      
      toast({
        title: "Success!",
        description: `Your ${type} is ready for download`,
      });
      
      // In a real implementation, this would trigger the actual download
      // For demo purposes, we'll just show a success message
    } catch (error) {
      toast({
        title: "Download failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <Download className="h-6 w-6" />
            <span>Social Media Downloader</span>
          </motion.div>
        </CardTitle>
        <CardDescription className="text-center">
          Download videos and audio from your favorite platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Enter URL</Label>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5 text-muted-foreground" />
              <Input
                id="url"
                placeholder="Paste your link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Select Platform</Label>
            <div className="grid grid-cols-5 gap-2">
              {platforms.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlatform(item.id)}
                  className={`platform-icon flex flex-col items-center justify-center p-2 rounded-md ${
                    platform === item.id 
                      ? "bg-primary/20 border border-primary/50" 
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <span className="text-xs mt-1">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Audio
              </TabsTrigger>
            </TabsList>
            <TabsContent value="video" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quality">Video Quality</Label>
                <Select>
                  <SelectTrigger id="quality">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="highest">Highest</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="360p">360p</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full" 
                onClick={(e) => handleSubmit(e, "video")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                  </motion.div>
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Download Video
              </Button>
            </TabsContent>
            <TabsContent value="audio" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="format">Audio Format</Label>
                <Select>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="aac">AAC</SelectItem>
                    <SelectItem value="ogg">OGG</SelectItem>
                    <SelectItem value="wav">WAV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full" 
                onClick={(e) => handleSubmit(e, "audio")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Music className="h-4 w-4 mr-2" />
                  </motion.div>
                ) : (
                  <Music className="h-4 w-4 mr-2" />
                )}
                Download Audio
              </Button>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground">
        For personal use only. Respect copyright laws.
      </CardFooter>
    </Card>
  );
};

export default DownloadForm;
