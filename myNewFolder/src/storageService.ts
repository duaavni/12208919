
export interface UrlData {
  id: string;
  longUrl: string;
  shortCode: string;
  createdAt: string;
  expiresAt: string;
  clicks: { timestamp: string }[];
}

const STORAGE_KEY = "shortUrls";

export const getUrls = (): UrlData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUrl = (urlData: Omit<UrlData, 'id' | 'createdAt' | 'clicks'>): UrlData | null => {
  const urls = getUrls();
  if (urls.some(url => url.shortCode === urlData.shortCode)) {
    return null; 
  }
  const newUrl: UrlData = {
    ...urlData,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    clicks: [],
  };
  urls.push(newUrl);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  return newUrl;
};

export const getUrlByShortcode = (shortCode: string): UrlData | undefined => {
  return getUrls().find(url => url.shortCode === shortCode);
};

export const incrementClickCount = (shortCode: string) => {
  const urls = getUrls();
  const urlIndex = urls.findIndex(url => url.shortCode === shortCode);
  if (urlIndex > -1) {
    urls[urlIndex].clicks.push({ timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  }
};