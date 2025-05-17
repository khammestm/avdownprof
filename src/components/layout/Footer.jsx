
import React from "react";
import { motion } from "framer-motion";
import { DownloadCloud, ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="border-t border-border/60 bg-background/80"
    >
      <div className="container py-8 max-w-screen-lg text-center">
        <div className="flex justify-center items-center space-x-2 mb-3">
          <DownloadCloud className="h-6 w-6 text-muted-foreground" />
          <span className="font-semibold text-muted-foreground">AVDown.pro</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AVDown.pro. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-green-500" />
            Please respect copyright laws and the terms of service of social media platforms.
        </p>
         <p className="text-xs text-muted-foreground mt-1">
            This tool is for personal use only with publicly available content.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
