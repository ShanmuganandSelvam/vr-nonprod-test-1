import React from 'react';
import BlobGallery from '@/components/blob-gallery';

export default function GalleryPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Blob Gallery</h1>
        <p className="text-muted-foreground mb-8">
          Browse and download pre-designed blob shapes for your projects.
        </p>
        
        <BlobGallery />
      </div>
    </div>
  );
}
