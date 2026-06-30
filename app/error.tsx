'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1B2A' }}>
      <div style={{ textAlign: 'center', color: '#F7F3E9' }}>
        <h2 style={{ marginBottom: '1rem' }}>Something went wrong</h2>
        <button onClick={reset} style={{ color: '#D4AF37', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }}>
          Try again
        </button>
      </div>
    </div>
  )
}
