"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateBlob, randomColor } from '@/lib/blob-utils';
import { Download, RefreshCw, Copy } from 'lucide-react';

export default function BlobGenerator() {
  const [complexity, setComplexity] = useState(8);
  const [size, setSize] = useState(300);
  const [randomness, setRandomness] = useState(30);
  const [color, setColor] = useState('#6366f1');
  const [useGradient, setUseGradient] = useState(false);
  const [gradientFrom, setGradientFrom] = useState('#6366f1');
  const [gradientTo, setGradientTo] = useState('#8b5cf6');
  const [gradientAngle, setGradientAngle] = useState(45);
  const [blobPath, setBlobPath] = useState('');
  const [svgId, setSvgId] = useState('blob-1');
  
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate blob on initial render and when parameters change
  useEffect(() => {
    generateNewBlob();
  }, [complexity, size, randomness, color, useGradient, gradientFrom, gradientTo, gradientAngle]);

  const generateNewBlob = () => {
    const gradient = useGradient ? { from: gradientFrom, to: gradientTo, angle: gradientAngle } : undefined;
    const blob = generateBlob(complexity, size, randomness, color, gradient);
    setBlobPath(blob.path);
  };

  const randomizeBlob = () => {
    setComplexity(Math.floor(Math.random() * 10) + 5);
    setRandomness(Math.floor(Math.random() * 50) + 10);
    const newColor = randomColor();
    setColor(newColor);
    if (useGradient) {
      setGradientFrom(newColor);
      setGradientTo(randomColor());
      setGradientAngle(Math.floor(Math.random() * 360));
    }
  };

  const downloadSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${svgId}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  const copyToClipboard = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    navigator.clipboard.writeText(svgData)
      .then(() => {
        alert('SVG copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy SVG: ', err);
      });
  };

  const gradientId = `blob-gradient-${svgId}`;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex justify-center items-center bg-muted/30 rounded-lg p-8 h-[400px]">
            <svg 
              ref={svgRef}
              width={size} 
              height={size} 
              viewBox={`0 0 ${size} ${size}`} 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              {useGradient && (
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${gradientAngle})`}>
                    <stop offset="0%" stopColor={gradientFrom} />
                    <stop offset="100%" stopColor={gradientTo} />
                  </linearGradient>
                </defs>
              )}
              <path 
                d={blobPath} 
                fill={useGradient ? `url(#${gradientId})` : color}
              />
            </svg>
          </div>
          
          <div className="flex gap-4 mt-6 justify-center">
            <Button onClick={randomizeBlob} className="flex gap-2">
              <RefreshCw size={16} />
              Randomize
            </Button>
            <Button onClick={downloadSVG} variant="outline" className="flex gap-2">
              <Download size={16} />
              Download SVG
            </Button>
            <Button onClick={copyToClipboard} variant="outline" className="flex gap-2">
              <Copy size={16} />
              Copy SVG
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="shape">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="shape" className="flex-1">Shape</TabsTrigger>
                  <TabsTrigger value="color" className="flex-1">Color</TabsTrigger>
                  <TabsTrigger value="export" className="flex-1">Export</TabsTrigger>
                </TabsList>
                
                <TabsContent value="shape" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="complexity">Complexity: {complexity}</Label>
                    </div>
                    <Slider
                      id="complexity"
                      min={3}
                      max={20}
                      step={1}
                      value={[complexity]}
                      onValueChange={(value) => setComplexity(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="randomness">Randomness: {randomness}%</Label>
                    </div>
                    <Slider
                      id="randomness"
                      min={0}
                      max={100}
                      step={1}
                      value={[randomness]}
                      onValueChange={(value) => setRandomness(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="size">Size: {size}px</Label>
                    </div>
                    <Slider
                      id="size"
                      min={100}
                      max={800}
                      step={10}
                      value={[size]}
                      onValueChange={(value) => setSize(value[0])}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="color" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="useGradient">Use Gradient</Label>
                      <Switch
                        id="useGradient"
                        checked={useGradient}
                        onCheckedChange={setUseGradient}
                      />
                    </div>
                  </div>
                  
                  {!useGradient ? (
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded-md border" 
                          style={{ backgroundColor: color }}
                        />
                        <Input
                          id="color"
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="gradientFrom">Gradient Start</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-10 h-10 rounded-md border" 
                            style={{ backgroundColor: gradientFrom }}
                          />
                          <Input
                            id="gradientFrom"
                            type="color"
                            value={gradientFrom}
                            onChange={(e) => setGradientFrom(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gradientTo">Gradient End</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-10 h-10 rounded-md border" 
                            style={{ backgroundColor: gradientTo }}
                          />
                          <Input
                            id="gradientTo"
                            type="color"
                            value={gradientTo}
                            onChange={(e) => setGradientTo(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="gradientAngle">Angle: {gradientAngle}°</Label>
                        </div>
                        <Slider
                          id="gradientAngle"
                          min={0}
                          max={360}
                          step={1}
                          value={[gradientAngle]}
                          onValueChange={(value) => setGradientAngle(value[0])}
                        />
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="export" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="svgId">SVG ID</Label>
                    <Input
                      id="svgId"
                      value={svgId}
                      onChange={(e) => setSvgId(e.target.value)}
                      placeholder="Enter SVG ID"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="svgCode">SVG Code</Label>
                    <div className="relative">
                      <textarea
                        id="svgCode"
                        readOnly
                        value={svgRef.current ? new XMLSerializer().serializeToString(svgRef.current) : ''}
                        className="w-full h-32 p-3 rounded-md border bg-muted font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          if (svgRef.current) {
                            navigator.clipboard.writeText(new XMLSerializer().serializeToString(svgRef.current));
                          }
                        }}
                      >
                        <Copy size={14} />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
