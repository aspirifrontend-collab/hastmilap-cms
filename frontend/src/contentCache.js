const CONTENT_CACHE_KEY = 'hastmilap_content';

export function getCachedContent() {
  try {
    const cached = localStorage.getItem(CONTENT_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

export function setCachedContent(content) {
  try {
    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(content));
  } catch {
    // localStorage may be unavailable (e.g. private browsing) or full; caching is a non-essential optimization.
  }
}
