
import React from "react";
import { motion } from "framer-motion";
import DownloadForm from "@/components/DownloadForm";
import DownloadHistory from "@/components/DownloadHistory"; // Assuming this component exists for history
import { Shield, HelpCircle, Zap } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    className="flex flex-col items-center p-4 sm:p-6 bg-card rounded-lg shadow-sm border border-border/50 glass-card"
    whileHover={{ y: -5, boxShadow: "0 10px 20px hsla(var(--shadow-color), 0.1)" }}
    style={{ "--shadow-color": "var(--primary)"}}
  >
    <div className="p-3 mb-3 text-primary bg-primary/10 rounded-full">
      {React.createElement(icon, { className: "h-6 w-6 sm:h-7 sm:w-7" })}
    </div>
    <h3 className="text-md sm:text-lg font-semibold mb-1 text-center text-foreground">{title}</h3>
    <p className="text-xs sm:text-sm text-muted-foreground text-center">{description}</p>
  </motion.div>
);

const DownloaderPage = () => {
  return (
    <div className="space-y-10 sm:space-y-16 pb-8">
      <DownloadForm />

      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-foreground">Why AVDown.pro?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <FeatureCard 
            icon={Zap} 
            title="Fast & Easy" 
            description="Quickly download videos and audio with a simple paste of a link. No complex steps."
          />
          <FeatureCard 
            icon={Shield} 
            title="Safe & Secure" 
            description="Your privacy is important. We aim for a secure downloading experience. (Simulated)"
          />
          <FeatureCard 
            icon={HelpCircle} 
            title="Multiple Platforms" 
            description="Supports YouTube, Instagram, Facebook, X (Twitter), and TikTok. More coming soon!"
          />
        </div>
      </section>
      
      <DownloadHistory />
    </div>
  );
};

export default DownloaderPage;
