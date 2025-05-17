
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Tags, FileText, Copy, Check, Edit3, Download, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const ClipCard = ({ clip, index, onUpdateClip }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(clip.title);
  const [editableDescription, setEditableDescription] = useState(clip.description);
  const [editableTags, setEditableTags] = useState(clip.tags.join(", "));

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${fieldName} copied successfully.`,
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdateClip(clip.id, {
        title: editableTitle,
        description: editableDescription,
        tags: editableTags.split(",").map(tag => tag.trim()).filter(tag => tag),
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="glassmorphic-card overflow-hidden">
        <CardHeader className="p-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Scissors className="w-5 h-5 mr-2 text-primary" />
              {isEditing ? (
                <Input 
                  value={editableTitle} 
                  onChange={(e) => setEditableTitle(e.target.value)}
                  className="text-lg"
                />
              ) : (
                clip.title
              )}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handleEditToggle} className="h-8 w-8">
                {isEditing ? <Check className="w-4 h-4 text-green-500" /> : <Edit3 className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => alert("Video player not implemented.")} className="h-8 w-8">
                 <PlayCircle className="w-4 h-4 text-primary" />
              </Button>
            </div>
            
          </div>
          <p className="text-xs text-muted-foreground pt-1">Duration: {clip.duration}s (Segment: {clip.startTime}s - {clip.endTime}s)</p>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div>
            <Label htmlFor={`description-${clip.id}`} className="text-xs font-semibold flex items-center mb-1">
              <FileText className="w-3 h-3 mr-1 text-accent" /> Description
            </Label>
            {isEditing ? (
              <Textarea
                id={`description-${clip.id}`}
                value={editableDescription}
                onChange={(e) => setEditableDescription(e.target.value)}
                rows={3}
                className="text-sm"
              />
            ) : (
              <p className="text-sm text-muted-foreground bg-secondary/30 p-2 rounded-md break-words">
                {clip.description}
              </p>
            )}
            {!isEditing && (
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(clip.description, "Description")} className="mt-1 h-7 text-xs">
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
            )}
          </div>
          <div>
            <Label htmlFor={`tags-${clip.id}`} className="text-xs font-semibold flex items-center mb-1">
              <Tags className="w-3 h-3 mr-1 text-accent" /> Tags
            </Label>
            {isEditing ? (
              <Input
                id={`tags-${clip.id}`}
                value={editableTags}
                onChange={(e) => setEditableTags(e.target.value)}
                placeholder="e.g. funny, gaming, tutorial"
                className="text-sm"
              />
            ) : (
              <div className="flex flex-wrap gap-1">
                {clip.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {!isEditing && clip.tags.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(clip.tags.join(", "), "Tags")} className="mt-1 h-7 text-xs">
                <Copy className="w-3 h-3 mr-1" /> Copy Tags
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t border-border/30">
          <Button className="w-full gradient-hero text-primary-foreground hover:opacity-90 transition-opacity" onClick={() => alert("Download not implemented.")}>
            <Download className="w-4 h-4 mr-2" />
            Download Clip
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClipCard;
