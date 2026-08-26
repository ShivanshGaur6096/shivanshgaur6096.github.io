/**
 * App Store (iTunes Lookup API) Client & Utilities
 * Fetches real-time metadata, ratings, screenshots, and version info from Apple Storefronts.
 * Includes local storage caching with 24-hour TTL.
 */

const CACHE_PREFIX = 'portfolio_appstore_v3_';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

/**
 * Clean & upgrade Apple CDN screenshot URLs to full high-resolution assets
 * (Apple iTunes API defaults to small preview dimensions like /643x0w.jpg, /392x696bb.png, /406x0w.png)
 */
function upgradeScreenshotQuality(url) {
  if (!url || typeof url !== 'string') return url;
  // Replace any Apple bounding box dimension pattern with full-res 1284x2778bb
  return url
    .replace(/\/\d+x\d+bb\.(png|jpg|webp|jpeg)/i, '/1284x2778bb.$1')
    .replace(/\/\d+x\d+w\.(png|jpg|webp|jpeg)/i, '/1284x2778bb.$1')
    .replace(/\/\d+x\d+\.(png|jpg|webp|jpeg)/i, '/1284x2778bb.$1');
}

/**
 * Format rating numbers cleanly (e.g. 4.636 -> '4.6')
 */
export function formatRating(rating) {
  if (!rating || typeof rating !== 'number' || rating <= 0) return null;
  return rating.toFixed(1);
}

/**
 * Format user rating counts to human readable strings (e.g. 12400 -> '12.4K', 1500000 -> '1.5M')
 */
export function formatReviewCount(count) {
  if (!count || count <= 0) return null;
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Format file size in bytes to MB (e.g. 87871488 -> '83.8 MB')
 */
export function formatFileSize(bytesStr) {
  if (!bytesStr) return null;
  const bytes = parseInt(bytesStr, 10);
  if (isNaN(bytes) || bytes <= 0) return null;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

/**
 * Format release date ISO string to short human readable date (e.g. 'Jul 2024')
 */
export function formatReleaseDate(dateStr) {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return null;
  }
}

/**
 * Read cached app store response from localStorage
 */
function getCachedData(key) {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
      return parsed.data;
    }
    localStorage.removeItem(CACHE_PREFIX + key);
  } catch (e) {
    console.warn('[AppStoreService] Cache read error:', e);
  }
  return null;
}

/**
 * Save app store response into localStorage cache
 */
function setCachedData(key, data) {
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  } catch (e) {
    console.warn('[AppStoreService] Cache write error:', e);
  }
}

/**
 * Fetch a single app's metadata by its App Store Track ID
 * @param {string|number} trackId - The numeric Apple App ID
 * @param {string} country - 2-letter ISO country code (e.g. 'gb', 'ca', 'us', 'in')
 */
export async function fetchAppStoreData(trackId, country = 'us') {
  if (!trackId) return null;

  const cacheKey = `${trackId}_${country}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(trackId)}&country=${encodeURIComponent(country)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`iTunes API HTTP ${response.status}`);
    }

    const json = await response.json();
    if (json.resultCount > 0 && json.results && json.results.length > 0) {
      const app = json.results[0];
      const normalized = {
        trackId: app.trackId,
        trackName: app.trackName || app.trackCensoredName,
        artistName: app.artistName || app.sellerName,
        artistId: app.artistId,
        sellerUrl: app.sellerUrl,
        trackViewUrl: app.trackViewUrl,
        artworkUrl100: app.artworkUrl100,
        artworkUrl512: app.artworkUrl512,
        screenshots: (app.screenshotUrls || []).map(upgradeScreenshotQuality),
        ipadScreenshots: (app.ipadScreenshotUrls || []).map(upgradeScreenshotQuality),
        averageUserRating: app.averageUserRating,
        userRatingCount: app.userRatingCount,
        formattedRating: formatRating(app.averageUserRating),
        formattedReviewCount: formatReviewCount(app.userRatingCount),
        minimumOsVersion: app.minimumOsVersion,
        version: app.version,
        formattedSize: formatFileSize(app.fileSizeBytes),
        releaseDate: app.releaseDate,
        formattedReleaseDate: formatReleaseDate(app.currentVersionReleaseDate || app.releaseDate),
        primaryGenreName: app.primaryGenreName,
        contentAdvisoryRating: app.contentAdvisoryRating,
        storeCountry: country.toUpperCase(),
      };

      setCachedData(cacheKey, normalized);
      return normalized;
    }
  } catch (error) {
    console.warn(`[AppStoreService] Failed fetching data for app ${trackId} (${country}):`, error);
  }

  return null;
}

/**
 * Fetch all apps belonging to a developer by Developer ID
 * @param {string|number} developerId - The numeric Apple Developer ID
 * @param {string} country - 2-letter ISO country code
 */
export async function fetchAppsByDeveloper(developerId, country = 'us') {
  if (!developerId) return [];

  const cacheKey = `dev_${developerId}_${country}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(developerId)}&entity=software&country=${encodeURIComponent(country)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`iTunes API HTTP ${response.status}`);
    }

    const json = await response.json();
    if (json.resultCount > 0 && json.results) {
      // First item is often developer info, rest are software
      const apps = json.results
        .filter((item) => item.wrapperType === 'software')
        .map((app) => ({
          trackId: app.trackId,
          name: app.trackName || app.trackCensoredName,
          description: app.primaryGenreName,
          logo: app.artworkUrl100 || app.artworkUrl60,
          appStoreLink: app.trackViewUrl,
          rating: formatRating(app.averageUserRating),
        }));

      setCachedData(cacheKey, apps);
      return apps;
    }
  } catch (error) {
    console.warn(`[AppStoreService] Failed fetching apps for developer ${developerId}:`, error);
  }

  return [];
}
