
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ListVideo, AlertTriangle } from "lucide-react";
import ClipCard from "@/components/ClipCard";
import { Button } from "@/components/ui/button";

const mockTranscripts = {
  interview: [
    { text: "Welcome to the show, can you tell us about your new project?", start: 0, end: 5 },
    { text: "Certainly, our new project focuses on AI-driven content creation.", start: 6, end: 12 },
    { text: "That sounds fascinating. What are the key features?", start: 13, end: 17 },
    { text: "One key feature is automated short video generation from long-form content.", start: 18, end: 25 },
    { text: "How does it identify the best segments for these short clips?", start: 26, end: 31 },
    { text: "It uses semantic analysis and engagement cues to find impactful moments.", start: 32, end: 38 },
    { text: "That's impressive. What about for different types of content, like gaming?", start: 40, end: 45 },
    { text: "For gaming, it can detect highlights like boss fights or level completions.", start: 46, end: 52 },
    { text: "Thank you for sharing these insights with us today.", start: 55, end: 59 }
  ],
  gameplay: [
    { text: "Player explores the starting area.", start: 0, end: 30, type: "exploration" },
    { text: "First mini-boss encounter begins.", start: 31, end: 35, type: "cutscene" },
    { text: "Player defeats the mini-boss.", start: 36, end: 90, type: "action" },
    { text: "Player discovers a hidden treasure chest.", start: 91, end: 120, type: "discovery" },
    { text: "Level 1 complete! Moving to level 2.", start: 121, end: 125, type: "chapter_end" },
    { text: "Cutscene: Introduction to the main antagonist.", start: 126, end: 150, type: "cutscene" },
    { text: "Player engages in a major puzzle sequence.", start: 151, end: 210, type: "puzzle" },
    { text: "Final boss battle commences.", start: 211, end: 215, type: "cutscene" },
    { text: "Player defeats the final boss after an epic fight.", start: 216, end: 300, type: "action_highlight" },
    { text: "Ending cutscene and credits.", start: 301, end: 360, type: "cutscene" }
  ]
};

const generateClips = (videoFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isGameplay = videoFile.name.toLowerCase().includes("gameplay") || videoFile.name.toLowerCase().includes("gaming");
      const transcript = isGameplay ? mockTranscripts.gameplay : mockTranscripts.interview;
      const generated = [];
      let clipId = 0;

      if (isGameplay) {
        let currentSegment = [];
        transcript.forEach((item, index) => {
          currentSegment.push(item);
          if (item.type === "cutscene" || item.type === "chapter_end" || item.type === "action_highlight" || index === transcript.length - 1) {
            if (currentSegment.length > 0) {
              const startTime = currentSegment[0].start;
              const endTime = currentSegment[currentSegment.length - 1].end;
              const duration = endTime - startTime;
              if (duration >= 30 && duration <= 180) {
                generated.push({
                  id: `clip-${clipId++}`,
                  title: `Gameplay Highlight ${clipId}`,
                  description: `Exciting moment from ${currentSegment[0].text.substring(0,20)}... to ${currentSegment[currentSegment.length - 1].text.substring(0,20)}...`,
                  tags: ["gaming", "gameplay", currentSegment[0].type],
                  startTime,
                  endTime,
                  duration,
                  videoUrl: URL.createObjectURL(videoFile), 
                });
              }
              currentSegment = [];
            }
          }
        });
      } else { // Interview or Speech
        const significantSegments = transcript.filter(seg => (seg.end - seg.start) > 10); // Segments longer than 10s
        significantSegments.forEach((seg, i) => {
          const duration = seg.end - seg.start;
          if (duration >= 30 && duration <= 180) {
            generated.push({
              id: `clip-${clipId++}`,
              title: `Insightful Moment ${clipId}`,
              description: seg.text,
              tags: ["interview", "insights", "speech"],
              startTime: seg.start,
              endTime: seg.end,
              duration,
              videoUrl: URL.createObjectURL(videoFile),
            });
          }
          // Combine adjacent segments for longer clips if needed
          if (i < significantSegments.length - 1) {
            const nextSeg = significantSegments[i+1];
            const combinedDuration = (nextSeg.end - seg.start);
            if (combinedDuration >= 60 && combinedDuration <= 180) {
                 generated.push({
                  id: `clip-${clipId++}`,
                  title: `Extended Discussion ${clipId}`,
                  description: `${seg.text.substring(0,50)}... and ${nextSeg.text.substring(0,50)}...`,
                  tags: ["discussion", "deepdive"],
                  startTime: seg.start,
                  endTime: nextSeg.end,
                  duration: combinedDuration,
                  videoUrl: URL.createObjectURL(videoFile),
                });
            }
          }
        });
      }
      
      resolve(generated.slice(0, 5)); // Limit to 5 clips for demo
    }, 3000); // Simulate backend processing time
  });
};


const GeneratedClips = ({ videoFile, onBack }) => {
  const [clips, setClips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoFile) {
      setIsLoading(true);
      setError(null);
      generateClips(videoFile)
        .then(setClips)
        .catch(err => {
          console.error("Error generating clips:", err);
          setError("Failed to generate clips. Please try again.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [videoFile]);

  const updateClip = (clipId, updatedData) => {
    setClips(prevClips => 
      prevClips.map(clip => clip.id === clipId ? { ...clip, ...updatedData } : clip)
    );
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 space-y-4 glassmorphic-card"
      >
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <p className="text-lg font-semibold">Generating your video clips...</p>
        <p className="text-sm text-muted-foreground">This might take a few moments. Analyzing content...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 space-y-4 glassmorphic-card"
      >
        <AlertTriangle className="w-16 h-16 text-destructive" />
        <p className="text-lg font-semibold text-destructive">Error Generating Clips</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button onClick={onBack} variant="outline">Try Another Video</Button>
      </motion.div>
    );
  }
  
  if (clips.length === 0 && !isLoading) {
     return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 space-y-4 glassmorphic-card"
      >
        <ListVideo className="w-16 h-16 text-muted-foreground opacity-50" />
        <p className="text-lg font-semibold">No Suitable Clips Found</p>
        <p className="text-sm text-muted-foreground">We couldn't identify distinct segments fitting the criteria in this video.</p>
        <Button onClick={onBack} variant="outline">Upload Another Video</Button>
      </motion.div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <ListVideo className="w-7 h-7 mr-3 text-primary" />
          Generated Clips ({clips.length})
        </h2>
        <Button onClick={onBack} variant="outline">Upload New Video</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {clips.map((clip, index) => (
            <ClipCard key={clip.id} clip={clip} index={index} onUpdateClip={updateClip} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GeneratedClips;
