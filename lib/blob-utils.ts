/**
 * Utility functions for generating and manipulating SVG blobs
 */

// Generate a random number between min and max
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate a random color in HSL format
export const randomColor = () => {
  const h = random(0, 360);
  const s = random(70, 100);
  const l = random(60, 80);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Generate points for a blob with given complexity and size
export const generateBlobPoints = (
  complexity: number,
  size: number,
  randomness: number
): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  const angleStep = (Math.PI * 2) / complexity;
  const center = size / 2;

  for (let i = 0; i < complexity; i++) {
    const angle = i * angleStep;
    const radius = center * (1 - randomness / 100) + (random(0, randomness) / 100) * center;
    
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    
    points.push({ x, y });
  }

  return points;
};

// Generate SVG path from points
export const generateBlobPath = (points: { x: number; y: number }[]): string => {
  if (points.length < 3) return '';
  
  let path = `M ${points[0].x},${points[0].y}`;
  
  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[(i + 1) % points.length];
    const nextNext = points[(i + 2) % points.length];
    
    const cp1x = (curr.x + next.x) / 2;
    const cp1y = (curr.y + next.y) / 2;
    const cp2x = (next.x + nextNext.x) / 2;
    const cp2y = (next.y + nextNext.y) / 2;
    
    path += ` Q ${next.x},${next.y} ${cp2x},${cp2y}`;
  }
  
  path += ' Z';
  return path;
};

// Generate a complete blob SVG with given parameters
export const generateBlob = (
  complexity: number = 8,
  size: number = 300,
  randomness: number = 30,
  color: string = randomColor(),
  gradient?: { from: string; to: string; angle?: number }
): { path: string; color: string; gradient?: { from: string; to: string; angle: number } } => {
  const points = generateBlobPoints(complexity, size, randomness);
  const path = generateBlobPath(points);
  
  return {
    path,
    color,
    gradient: gradient ? { ...gradient, angle: gradient.angle || 45 } : undefined
  };
};
