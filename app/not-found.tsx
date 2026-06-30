export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1B2A' }}>
      <div style={{ textAlign: 'center', color: '#F7F3E9' }}>
        <h2 style={{ marginBottom: '1rem' }}>Page not found</h2>
        <a href="/" style={{ color: '#D4AF37' }}>Go home</a>
      </div>
    </div>
  )
}
