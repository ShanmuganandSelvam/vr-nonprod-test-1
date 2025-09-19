import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Droplet, Palette, Download, Code } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Beautiful <span className="text-primary">Blob Shapes</span> for Your Designs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            BlobCraft helps you generate, customize, and export unique blob shapes for your websites, apps, and graphic designs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/create">Create Your Blob</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { color: '#6366f1', path: "M150,20.7c23.9,6.4,43.9,28.1,46.7,52.1c2.8,24-11.7,50.3-32.8,67.2c-21.1,16.9-48.9,24.4-72.8,17.7c-23.9-6.7-43.9-27.6-46.7-51.6c-2.8-24,11.7-51.1,32.8-67.7C98.3,21.8,126.1,14.3,150,20.7z" },
              { color: '#8b5cf6', path: "M150,25.7c19.4,9.4,33.9,28.1,36.7,52.1c2.8,24-6.1,53.3-27.2,67.2c-21.1,13.9-54.4,12.4-78.3,0.7c-23.9-11.7-38.3-33.6-41.1-57.6c-2.8-24,6.1-50.1,27.2-64C88.3,10.3,130.6,16.3,150,25.7z" },
              { color: '#ec4899', path: "M150,30.7c15,12.4,23.9,38.1,26.7,62.1c2.8,24-0.6,46.3-21.7,60.2c-21.1,13.9-59.9,19.4-83.8,7.7c-23.9-11.7-32.8-40.6-35.6-64.6c-2.8-24,0.6-43.1,21.7-57C78.3,25.3,135,18.3,150,30.7z" }
            ].map((blob, index) => (
              <div key={index} className="flex justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                  <path d={blob.path} fill={blob.color} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customizable</h3>
                  <p className="text-muted-foreground">
                    Adjust complexity, randomness, size, and colors to create the perfect blob for your design.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Export Options</h3>
                  <p className="text-muted-foreground">
                    Download your blobs as SVG files or copy the SVG code directly to your clipboard.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
                  <p className="text-muted-foreground">
                    Clean SVG code that's easy to integrate into your web projects and design tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Own Blobs?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Start creating unique blob shapes for your next project in seconds.
          </p>
          <Button size="lg" asChild>
            <Link href="/create">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
