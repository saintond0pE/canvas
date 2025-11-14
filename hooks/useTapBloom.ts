import { useState, useCallback } from 'react';
import { Bloom, BloomShapeType } from '../components/TapBloomEffect';

const SHAPE_TYPES: BloomShapeType[] = ['asterisk', 'semicircle', 'wavyline', 'arc'];
const BLOOM_LIFESPAN = 1500; // milliseconds

export const useTapBloom = (): [Bloom[], (x: number, y: number) => void] => {
  const [blooms, setBlooms] = useState<Bloom[]>([]);

  const addBloom = useCallback((x: number, y: number) => {
    const newBloom: Bloom = {
      id: Date.now() + Math.random(),
      x,
      y,
      type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
      rotation: Math.random() * 90 - 45, // -45 to 45 degrees
    };

    setBlooms(currentBlooms => [...currentBlooms, newBloom]);

    setTimeout(() => {
      setBlooms(currentBlooms => currentBlooms.filter(b => b.id !== newBloom.id));
    }, BLOOM_LIFESPAN);
  }, []);

  return [blooms, addBloom];
};