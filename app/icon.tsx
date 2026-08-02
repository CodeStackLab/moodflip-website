import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

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
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 4,
            left: 4,
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '5px solid #713ee2',
            borderTopColor: 'transparent',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 4,
            top: 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#f4a746',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 4,
            top: 10,
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: '#d94fc5',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
