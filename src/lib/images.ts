/**
 * Utility for responsive Unsplash image URLs.
 * Returns smaller images on mobile to save bandwidth.
 */
export const imgUrl = (baseUrl: string, mobile = false): string => {
  const url = new URL(baseUrl);
  url.searchParams.set("w", mobile ? "300" : "800");
  url.searchParams.set("q", mobile ? "50" : "70");
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
};
