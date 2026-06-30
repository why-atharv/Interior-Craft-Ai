import React from 'react';
import { useAppStore } from '../../store/useAppStore';

/**
 * Mini-map showing a scaled-down overview of the canvas and all items.
 */
export const MiniMap: React.FC = () => {
  const { room, items } = useAppStore();
  const scale = 40;
  const mapScale = 0.12; // how small the mini-map is
  const mapW = room.width * scale * mapScale;
  const mapH = room.height * scale * mapScale;

  return (
    <div
      className="absolute bottom-24 right-8 z-30 bg-white/80 backdrop-blur-md border border-dark/10 rounded-xl shadow-xl overflow-hidden"
      style={{ width: mapW + 16, height: mapH + 16, padding: 8 }}
      title="Mini Map"
    >
      <div className="relative" style={{ width: mapW, height: mapH, background: '#fafafa', borderRadius: 4 }}>
        {items.map(item => (
          <div
            key={item.id}
            className="absolute rounded-sm opacity-80"
            style={{
              left: item.x * mapScale,
              top: item.y * mapScale,
              width: Math.max(item.width * mapScale, 4),
              height: Math.max(item.height * mapScale, 4),
              backgroundColor: item.color || '#84A98C',
              transform: `rotate(${item.rotation}deg)`,
            }}
          />
        ))}
      </div>
      <p className="text-[9px] text-dark/30 text-center mt-1 font-medium tracking-wide">MINI MAP</p>
    </div>
  );
};
