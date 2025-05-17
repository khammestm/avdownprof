
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Edit3, UploadCloud, Tag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SkyscraperAdPlaceholder = ({ title = "Advertisement" }) => (
  <Card className="glass-card h-full sticky top-24">
    <CardHeader className="pb-2">
      <CardTitle className="text-center text-xs text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center justify-center h-full min-h-[400px] lg:min-h-[500px]">
      <p className="text-muted-foreground transform -rotate-90 whitespace-nowrap">Skyscraper Ad</p>
    </CardContent>
  </Card>
);


const initialPosts = [
  { id: 1, title: "Welcome to Avdown.pro!", date: "2025-05-16", excerpt: "We're excited to launch our new platform for easy media downloads...", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", keywords: "welcome, launch, avdown.pro", seoTitle: "Welcome to Avdown.pro - Your New Media Downloader" },
  { id: 2, title: "Tips for Faster Downloads", date: "2025-05-10", excerpt: "Learn how to optimize your download experience with Avdown.pro...", image: "https://images.unsplash.com/photo-1587614203976-365c7d669aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc3QlMjBkb3dubG9hZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60", keywords: "tips, speed, optimization, downloads", seoTitle: "Boost Your Download Speed on Avdown.pro - Tips & Tricks" },
  { id: 3, title: "Understanding Copyrights & Fair Use", date: "2025-05-05", excerpt: "A quick guide on responsible downloading and respecting content creators...", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", keywords: "copyright, fair use, legal, responsible downloading", seoTitle: "Copyright and Fair Use Guide for Avdown.pro Users" },
];

const BlogPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const { isAdmin } = useAuth();


  const handleImageUpload = (postId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosts(posts.map(p => p.id === postId ? { ...p, image: reader.result } : p));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeywordsChange = (postId, value) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, keywords: value } : p));
  };
  
  const handleSeoTitleChange = (postId, value) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, seoTitle: value } : p));
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8"
    >
      <header className="text-center mb-12">
        <motion.h1 
          initial={{ opacity:0, scale:0.8 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center justify-center gap-3"
        >
          <BookOpen className="h-10 w-10 md:h-12 md:w-12"/> Our Blog
        </motion.h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Latest news, tips, and updates from the Avdown.pro team.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        <aside className="col-span-12 lg:col-span-3 order-2 lg:order-1 mt-6 lg:mt-0 hidden lg:block">
           <SkyscraperAdPlaceholder title="Blog Left Ad"/>
        </aside>
        
        <main className="col-span-12 lg:col-span-6 order-1 lg:order-2">
          <div className="space-y-12">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col glass-card overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
                  <img-replace alt={post.title} className="w-full h-56 md:h-72 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">{post.title}</CardTitle>
                    <CardDescription className="text-xs">
                      Published on {post.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-3">
                    <p className="text-muted-foreground">{post.excerpt}</p>
                     {isAdmin && (
                      <div className="space-y-3 pt-3 border-t border-secondary/50">
                        <div>
                          <Label htmlFor={`image-upload-${post.id}`} className="text-xs font-medium flex items-center gap-1"><UploadCloud className="h-4 w-4" />Change Image</Label>
                          <Input id={`image-upload-${post.id}`} type="file" accept="image/*" onChange={(e) => handleImageUpload(post.id, e)} className="text-xs h-8 mt-1" />
                        </div>
                        <div>
                          <Label htmlFor={`keywords-${post.id}`} className="text-xs font-medium flex items-center gap-1"><Tag className="h-4 w-4" />SEO Keywords (comma-separated)</Label>
                          <Input id={`keywords-${post.id}`} value={post.keywords} onChange={(e) => handleKeywordsChange(post.id, e.target.value)} className="text-xs h-8 mt-1" />
                        </div>
                         <div>
                          <Label htmlFor={`seo-title-${post.id}`} className="text-xs font-medium flex items-center gap-1"><Tag className="h-4 w-4" />SEO Title</Label>
                          <Input id={`seo-title-${post.id}`} value={post.seoTitle} onChange={(e) => handleSeoTitleChange(post.id, e.target.value)} className="text-xs h-8 mt-1" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-primary hover:underline p-0 flex items-center gap-1 text-sm">
                      Read More <Edit3 className="h-3 w-3"/>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-3 order-3 mt-6 lg:mt-0 hidden lg:block">
          <SkyscraperAdPlaceholder title="Blog Right Ad"/>
        </aside>
        <aside className="col-span-12 lg:hidden order-4 mt-8 space-y-6">
            <Card className="glass-card w-full"><CardContent className="flex items-center justify-center min-h-[100px]"><p className="text-muted-foreground">Mobile Blog Ad 1</p></CardContent></Card>
            <Card className="glass-card w-full"><CardContent className="flex items-center justify-center min-h-[100px]"><p className="text-muted-foreground">Mobile Blog Ad 2</p></CardContent></Card>
        </aside>
      </div>
    </motion.div>
  );
};

export default BlogPage;
