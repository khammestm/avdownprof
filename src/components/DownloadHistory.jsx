
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, Youtube, Instagram, Facebook, Twitter, Instagram as TikTok, Music, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const platformIcons = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  tiktok: TikTok
};

const typeIcons = {
  video: Video,
  audio: Music
};

const DownloadHistory = () => {
  const [history, setHistory] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("downloadHistory") || "[]");
    setHistory(savedHistory);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("downloadHistory");
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Your download history has been cleared"
    });
  };

  const handleDeleteItem = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem("downloadHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    toast({
      title: "Item removed",
      description: "Download history item has been removed"
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 text-muted-foreground"
      >
        <Clock className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No download history</h3>
        <p className="text-sm">Your download history will appear here</p>
      </motion.div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>Download History</span>
          </div>
        </CardTitle>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleClearHistory}
          className="h-8"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <div className="space-y-3">
            {history.map((item) => {
              const PlatformIcon = platformIcons[item.platform] || Youtube;
              const TypeIcon = typeIcons[item.type] || Video;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between p-3 rounded-md bg-secondary/30 border border-secondary/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                      <PlatformIcon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium capitalize">{item.type}</span>
                      </div>
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {item.url}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(item.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default DownloadHistory;
