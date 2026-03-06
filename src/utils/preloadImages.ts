export const preloadImages = (
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> => {
  let loadedCount = 0;
  const totalCount = urls.length;

  return Promise.all(
    urls.map((url) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (onProgress) onProgress(loadedCount, totalCount);
          resolve(img);
        };
        img.onerror = () => {
          console.error(`[Preloader Error] Failed to load image at: ${url}`);
          loadedCount++;
          if (onProgress) onProgress(loadedCount, totalCount);
          // Resolve with the skeleton image object so Promise.all doesn't fail
          resolve(img);
        };
      });
    })
  );
};
