
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, Film, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const VideoUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    const videoFile = acceptedFiles[0];
    if (videoFile && videoFile.type.startsWith("video/")) {
      setFile(videoFile);
      setUploadProgress(0);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid video file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10 + 5;
        if (progress >= 100) {
          clearInterval(interval);
          setUploadProgress(100);
          setTimeout(() => {
            setIsUploading(false);
            toast({
              title: "Upload Complete",
              description: `${file.name} has been uploaded successfully.`,
            });
            onUploadComplete(file);
          }, 500);
        } else {
          setUploadProgress(progress);
        }
      }, 200);
    };

    simulateUpload();
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 rounded-lg glassmorphic-card"
    >
      {!file ? (
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/10" : "border-muted hover:border-primary/70"}
            flex flex-col items-center justify-center text-center`}
        >
          <input {...getInputProps()} />
          <UploadCloud className={`w-16 h-16 mb-4 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
          <p className="text-lg font-semibold">
            {isDragActive ? "Drop the video here..." : "Drag 'n' drop a video file here, or click to select"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Max file size: 500MB. Supported formats: MP4, MOV, AVI</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} className="text-muted-foreground hover:text-destructive">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full h-3" />
              <p className="text-sm text-center text-muted-foreground">{uploadProgress.toFixed(0)}% uploaded</p>
            </div>
          )}

          {!isUploading && (
            <Button onClick={handleUpload} className="w-full gradient-hero text-primary-foreground hover:opacity-90 transition-opacity">
              <UploadCloud className="w-5 h-5 mr-2" />
              Process Video
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default VideoUpload;
