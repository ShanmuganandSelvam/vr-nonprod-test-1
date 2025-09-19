import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">About BlobCraft</h1>
        <p className="text-muted-foreground mb-8">
          Learn more about our blob generator tool and how to use it in your projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What are Blobs?</h3>
              <p className="text-muted-foreground">
                Blobs (or "organic shapes") are smooth, asymmetrical shapes with a natural, fluid appearance. 
                They're commonly used in modern web design to add visual interest, create depth, and guide the user's eye.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">How BlobCraft Works</h3>
              <p className="text-muted-foreground">
                BlobCraft uses SVG path generation algorithms to create smooth, random curves that form blob shapes. 
                You can adjust parameters like complexity and randomness to create the perfect blob for your needs.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
              <p className="text-muted-foreground">
                Blobs are perfect for website backgrounds, section dividers, image masks, decorative elements, 
                app illustrations, and more. They add a modern, organic feel to any design.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">How to Use BlobCraft</h2>
        
        <div className="space-y-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">1. Create a Blob</h3>
              <p className="text-muted-foreground mb-4">
                Head to the Create page and adjust the sliders to modify your blob's appearance. 
                Change the complexity, randomness, size, and colors until you're happy with the result.
              </p>
              <Button asChild>
                <Link href="/create">Create a Blob</Link>
              </Button>
            </div>
            <div className="md:w-1/2 bg-muted/30 p-8 rounded-lg flex justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M150,20.7c23.9,6.4,43.9,28.1,46.7,52.1c2.8,24-11.7,50.3-32.8,67.2c-21.1,16.9-48.9,24.4-72.8,17.7c-23.9-6.7-43.9-27.6-46.7-51.6c-2.8-24,11.7-51.1,32.8-67.7C98.3,21.8,126.1,14.3,150,20.7z" fill="#6366f1" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">2. Export Your Blob</h3>
              <p className="text-muted-foreground mb-4">
                Once you're satisfied with your blob, download it as an SVG file or copy the SVG code directly. 
                SVGs are perfect for web use as they scale without losing quality.
              </p>
            </div>
            <div className="md:w-1/2 bg-muted/30 p-8 rounded-lg flex justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="about-gradient" gradientTransform="rotate(45)">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <path d="M150,25.7c19.4,9.4,33.9,28.1,36.7,52.1c2.8,24-6.1,53.3-27.2,67.2c-21.1,13.9-54.4,12.4-78.3,0.7c-23.9-11.7-38.3-33.6-41.1-57.6c-2.8-24,6.1-50.1,27.2-64C88.3,10.3,130.6,16.3,150,25.7z" fill="url(#about-gradient)" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">3. Use in Your Projects</h3>
              <p className="text-muted-foreground mb-4">
                Integrate the SVG into your website, app, or design project. You can modify the SVG code further 
                to add animations, change colors, or adjust the size as needed.
              </p>
              <Button variant="outline" asChild>
                <Link href="/gallery">Browse Gallery</Link>
              </Button>
            </div>
            <div className="md:w-1/2 bg-muted/30 p-8 rounded-lg flex justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M150,30.7c15,12.4,23.9,38.1,26.7,62.1c2.8,24-0.6,46.3-21.7,60.2c-21.1,13.9-59.9,19.4-83.8,7.7c-23.9-11.7-32.8-40.6-35.6-64.6c-2.8-24,0.6-43.1,21.7-57C78.3,25.3,135,18.3,150,30.7z" fill="#10b981" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-6">Ready to Create?</h2>
          <Button size="lg" asChild>
            <Link href="/create">Start Creating Blobs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
