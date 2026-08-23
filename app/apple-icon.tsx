import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A0A3B 0%, #7464AC 100%)',
          borderRadius: '40px',
        }}
      >
        <div style={{ fontSize: '90px' }}>💜</div>
      </div>
    ),
    { ...size }
  );
}
