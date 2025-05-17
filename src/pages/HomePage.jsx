
import React from "react";
import { motion } from "framer-motion";
import DownloadForm from "@/components/DownloadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SkyscraperAdPlaceholder = ({ title = "Advertisement" }) => (
  <Card className="glass-card h-full sticky top-24">
    <CardHeader className="pb-2">
      <CardTitle className="text-center text-xs text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center justify-center h-full min-h-[400px] lg:min-h-[500px]">
      <p className="text-muted-foreground transform -rotate-90 whitespace-nowrap">Skyscraper Ad (e.g., 160x600)</p>
    </CardContent>
  </Card>
);

const MobileAdPlaceholder = ({ title = "Advertisement" }) => (
  <Card className="glass-card w-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-center text-sm text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center justify-center min-h-[100px]">
      <p className="text-muted-foreground">Mobile Ad Space</p>
    </CardContent>
  </Card>
);

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-2 md:py-8"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        <aside className="col-span-12 lg:col-span-3 order-2 lg:order-1 mt-6 lg:mt-0">
          <div className="lg:hidden">
            <MobileAdPlaceholder title="Mobile Ad Top" />
          </div>
          <div className="hidden lg:block">
            <SkyscraperAdPlaceholder title="Left Skyscraper Ad" />
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-6 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DownloadForm />
          </motion.div>
        </main>

        <aside className="col-span-12 lg:col-span-3 order-3 mt-6 lg:mt-0">
           <div className="lg:hidden">
             <MobileAdPlaceholder title="Mobile Ad Bottom" />
           </div>
           <div className="hidden lg:block">
            <SkyscraperAdPlaceholder title="Right Skyscraper Ad" />
           </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default HomePage;
