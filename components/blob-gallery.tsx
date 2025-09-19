"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateBlob, randomColor } from '@/lib/blob-utils';
import { Download, Copy } from 'lucide-react';

const PRESET_BLOBS = [
  { complexity: 6, randomness: 20, color: '#3b82f6' },
  { complexity: 8, randomness: 40, color: '#8b5cf6' },
  { complexity: 5, randomness: 30, color: '#ec4899' },
  { complexity: 10, randomness: 25, color: '#10b981' },
  { complexity: 7, randomness: 35, color: '#f59e0b' },
  { complexity: 9, randomness: 15, color: '#ef4444' },
  { complexity: 12, randomness: 20, color: '#6366f1' },
  { complexity: 6, randomness: 50, color: '#14b8a6' },
  { complexity: 8, randomness: 30, gradient: { from: '#6366f1', to: '#ec4899', angle: 45 } },
  { complexity: 7, randomness: 25, gradient: { from: '#3b82f6', to: '#10b981', angle: 135 } },
  { complexity: 9, randomness: 35, gradient: { from: '#f59e0b', to: '#ef4444', angle: 90 } },
  { complexity: 5, randomness: 40, gradient: { from: '#8b5cf6', to: '#14b8a6', angle: 180 } },
];

export default function BlobGallery() {
  const [blobs, setBlobs] = useState(() => 
    PRESET_BLOBS.map(preset => {
      const size = 200;
      return generateBlob(
        preset.complexity, 
        size, 
        preset.randomness, 
        preset.color || randomColor(),
        preset.gradient
      );
    })
  );

  const downloadSVG = (index: number) => {
    const blob = blobs[index];
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('width', '200');
    svgElement.setAttribute('height', '200');
    svgElement.setAttribute('viewBox', '0 0 200 200');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    if (blob.gradient) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      linearGradient.setAttribute('id', 'gradient');
      linearGradient.setAttribute('gradientTransform', `rotate(${blob.gradient.angle})`);
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', blob.gradient.from);
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', blob.gradient.to);
      
      linearGradient.appendChild(stop1);
      linearGradient.appendChild(stop2);
      defs.appendChild(linearGradient);
      svgElement.appendChild(defs);
    }
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', blob.path);
    path.setAttribute('fill', blob.gradient ? 'url(#gradient)' : blob.color);
    
    svgElement.appendChild(path);
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `blob-${index + 1}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  const copyToClipboard = (index: number) => {
    const blob = blobs[index];
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('width', '200');
    svgElement.setAttribute('height', '200');
    svgElement.setAttribute('viewBox', '0 0 200 200');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    if (blob.gradient) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      linearGradient.setAttribute('id', 'gradient');
      linearGradient.setAttribute('gradientTransform', `rotate(${blob.gradient.angle})`);
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', blob.gradient.from);
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', blob.gradient.to);
      
      linearGradient.appendChild(stop1);
      linearGradient.appendChild(stop2);
      defs.appendChild(linearGradient);
      svgElement.appendChild(defs);
    }
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', blob.path);
    path.setAttribute('fill', blob.gradient ? 'url(#gradient)' : blob.color);
    
    svgElement.appendChild(path);
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    navigator.clipboard.writeText(svgData)
      .then(() => {
        alert('SVG copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy SVG: ', err);
      });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Blob Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blobs.map((blob, index) => (
          <Card key={index} className="overflow-hidden group">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-full h-48 flex items-center justify-center bg-muted/30 rounded-md mb-4">
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  {blob.gradient && (
                    <defs>
                      <linearGradient id={`gallery-gradient-${index}`} gradientTransform={`rotate(${blob.gradient.angle})`}>
                        <stop offset="0%" stopColor={blob.gradient.from} />
                        <stop offset="100%" stopColor={blob.gradient.to} />
                      </linearGradient>
                    </defs>
                  )}
                  <path 
                    d={blob.path} 
                    fill={blob.gradient ? `url(#gallery-gradient-${index})` : blob.color}
                  />
                </svg>
              </div>
              <div className="flex gap-2 w-full">
                <Button 
                  onClick={() => downloadSVG(index)} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Download size={16} className="mr-1" /> Download
                </Button>
                <Button 
                  onClick={() => copyToClipboard(index)} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  <Copy size={16} className="mr-1" /> Copy SVG
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
