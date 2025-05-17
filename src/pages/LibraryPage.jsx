
import React from "react";
import { motion } from "framer-motion";
import { Library, Construction } from "lucide-react";

const LibraryPage = () => {
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
        className="p-6 bg-primary/10 rounded-full mb-6"
      >
        <Library className="h-16 w-16 sm:h-20 sm:w-20 text-primary" />
      </motion.div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Our Library</h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-2 max-w-md">
        This section is currently under construction.
      </p>
      <p className="text-sm text-muted-foreground max-w-md">
        We're working hard to bring you a collection of useful resources, tools, and perhaps some retro game goodies as inspired by cobalt.tools! Stay tuned.
      </p>
      <Construction className="h-10 w-10 mt-8 text-amber-500 animate-bounce" />
    </motion.div>
  );
};

export default LibraryPage;
