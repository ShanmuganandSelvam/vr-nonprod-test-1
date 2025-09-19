import React from 'react';
import BlobGenerator from '@/components/blob-generator';

export default function CreatePage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Create Your Blob</h1>
        <p className="text-muted-foreground mb-8">
          Customize and generate unique blob shapes for your designs.
        </p>
        
        <BlobGenerator />
      </div>
    </div>
  );
}
