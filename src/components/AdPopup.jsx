
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AdPopup = ({ id, title, description, imageUrl, position = "bottom-right", delay = 5000, isVisibleFlag = false }) => {
  const [isVisible, setIsVisible] = useState(isVisibleFlag);

  useEffect(() => {
    if (isVisibleFlag) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    } else {
        setIsVisible(false);
    }
  }, [delay, isVisibleFlag]);

  const handleClose = () => {
    setIsVisible(false);
    if (id) {
        localStorage.setItem(`adPopupDismissed_${id}`, 'true');
    }
  };

  useEffect(() => {
    if (id && localStorage.getItem(`adPopupDismissed_${id}`)) {
      setIsVisible(false);
    }
  }, [id]);

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
          className={`fixed z-50 ${positionClasses[position]}`}
        >
          <Card className="w-72 shadow-xl glass-card">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-md flex items-center gap-2"><Megaphone className="h-5 w-5 text-primary"/>{title}</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {imageUrl && <img-replace src={imageUrl} alt={title} className="w-full h-32 object-cover rounded-md mb-2" />}
              <CardDescription className="text-xs">{description}</CardDescription>
              <Button size="sm" className="w-full mt-3">Learn More</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdPopup;
