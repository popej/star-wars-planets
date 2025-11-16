/**
 * Back/Forward Cache (bfcache) plugin
 * 
 * This plugin ensures proper handling of the page when navigating
 * using browser's back/forward buttons to prevent bfcache failures.
 * 
 * Key principles:
 * - Don't use 'unload' or 'beforeunload' events
 * - Don't reload the page when restored from cache
 * - Clean up resources that might block caching
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  const handlePageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      // Page was restored from bfcache - DO NOT reload
      // Just refresh any stale data if needed
      console.log('[bfcache] Page restored from back/forward cache')
      
      // Optionally trigger a soft refresh of data
      // nuxtApp.hooks.callHook('page:finish')
    }
  }

  const handlePageHide = () => {
    // Clean up resources before page is cached
    // Cancel pending fetch requests, close connections, etc.
    console.log('[bfcache] Page being cached')
  }

  // Use pageshow/pagehide instead of load/unload
  window.addEventListener('pageshow', handlePageShow, { passive: true })
  window.addEventListener('pagehide', handlePageHide, { passive: true })

  return {
    provide: {
      bfcache: {
        isSupported: 'onpageshow' in window
      }
    }
  }
})
