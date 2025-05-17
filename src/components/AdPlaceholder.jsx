
import React from "react";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

const AdPlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-secondary/50 border-b border-border/70"
    >
      <div className="container max-w-screen-lg py-3 text-center">
        <div className="flex items-center justify-center text-sm text-muted-foreground space-x-2">
          <Megaphone className="h-4 w-4 text-primary" />
          <span>Your Advertisement Here - Support AVDown.pro!</span>
           <img  alt="Small horizontal ad banner" className="h-8 object-contain" src="https://images.unsplash.com/photo-1702569258595-e2ba242546c5" />
        </div>
      </div>
    </motion.div>
  );
};

export default AdPlaceholder;
