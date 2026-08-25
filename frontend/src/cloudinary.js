const UPLOAD_MARKER = '/video/upload/';

// Videos are uploaded to Cloudinary as-is (often 15-85MB), which is why they
// can take a long time to start playing. Cloudinary can transcode any
// existing delivery URL on the fly by inserting transformation flags right
// after "/upload/" - q_auto picks the lowest quality that still looks good,
// f_auto picks the best format for the requesting browser. Non-Cloudinary
// URLs (e.g. local fallback assets) are returned unchanged.
export function optimizeCloudinaryVideo(url) {
  if (!url || typeof url !== 'string') return url;
  const idx = url.indexOf(UPLOAD_MARKER);
  if (idx === -1) return url;
  const insertAt = idx + UPLOAD_MARKER.length;
  if (url.startsWith('q_auto', insertAt)) return url;
  return url.slice(0, insertAt) + 'q_auto,f_auto/' + url.slice(insertAt);
}
