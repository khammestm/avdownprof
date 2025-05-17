
import React from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare as MessageSquareText, Construction } from 'lucide-react';

const CommunityPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-12 sm:py-20"
    >
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 150 }}
        className="p-6 bg-accent/10 rounded-full mb-6"
      >
        <Users className="h-16 w-16 sm:h-20 sm:w-20 text-accent" />
      </motion.div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Join Our Community</h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-2 max-w-md">
        The community forum is coming soon!
      </p>
      <p className="text-sm text-muted-foreground max-w-md">
        Connect with other users, share tips, ask questions, and discuss your favorite downloads. We're building a space for everyone.
      </p>
      <Construction className="h-10 w-10 mt-8 text-amber-500 animate-bounce" />
       <MessageSquareText className="h-8 w-8 mt-4 text-muted-foreground opacity-50" />
    </motion.div>
  );
};

export default CommunityPage;
