
import React from "react";
import { motion } from "framer-motion";
import { Info, DownloadCloud, ShieldAlert, Users, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-8 sm:py-12 space-y-10 px-4"
    >
      <header className="text-center space-y-3">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 150 }}
          className="inline-block p-4 bg-primary/10 rounded-full"
        >
          <Info className="h-12 w-12 text-primary" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">About AVDown.pro</h1>
        <p className="text-md sm:text-lg text-muted-foreground">
          Your simple and efficient solution for downloading publicly available videos and audio from popular social media platforms.
        </p>
      </header>

      <section className="space-y-6">
        <div className="p-6 rounded-lg glass-card border border-border/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center text-foreground">
            <DownloadCloud className="h-6 w-6 mr-2 text-primary" /> Our Mission
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            AVDown.pro aims to provide a user-friendly tool for personal use, allowing you to save online media for offline viewing or archival. We strive for simplicity and a clean interface, inspired by effective tools like cobalt.tools, focusing on core download functionalities.
          </p>
        </div>

        <div className="p-6 rounded-lg glass-card border border-border/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center text-foreground">
            <ShieldAlert className="h-6 w-6 mr-2 text-destructive" /> Important Disclaimer
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            AVDown.pro should only be used to download content that you have the right to access and save. Always respect copyright laws and the terms of service of the respective social media platforms. This tool is intended for downloading publicly available, non-copyrighted material or content for which you have explicit permission from the copyright holder. Unauthorized downloading and distribution of copyrighted material is illegal.
          </p>
        </div>
        
        <div className="p-6 rounded-lg glass-card border border-border/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center text-foreground">
            <Users className="h-6 w-6 mr-2 text-accent" /> Community & Future
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
            We plan to build a community around AVDown.pro where users can share feedback and suggestions. Our library section will also grow with resources.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            This project is currently a frontend demonstration. Actual download functionality relies on robust backend services to interact with platforms like YouTube, Instagram, Facebook, X (Twitter), and TikTok.
          </p>
        </div>
      </section>
      
      <div className="text-center mt-10">
        <Button variant="outline" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View on GitHub (Example)
            </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default AboutPage;
