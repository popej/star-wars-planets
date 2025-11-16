/**
 * Server middleware to add performance and security headers
 */
export default defineEventHandler((event) => {
  const headers = event.node.res.getHeaders()
  
  // Security headers for better Lighthouse scores
  setResponseHeaders(event, {
    // Prevent clickjacking
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' https://swapi.dev; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
    
    // XSS Protection
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  })

  // Add cache headers for static assets
  const path = event.node.req.url || ''
  
  if (path.match(/\.(js|css|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|webp|avif|ico)$/)) {
    setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  } else if (path.startsWith('/api/')) {
    // API responses - short cache with revalidation
    setResponseHeader(event, 'Cache-Control', 'public, max-age=60, must-revalidate')
  } else {
    // HTML pages - cache but revalidate
    setResponseHeader(event, 'Cache-Control', 'public, max-age=0, must-revalidate')
  }
})
