export const preloadImages = (urls: string[]): Promise<HTMLImageElement[]> => {
  return Promise.all(
    urls.map((url) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.error(`[Preloader Error] Failed to load image at: ${url}`);
          // Resolve with a dummy or just the broken image so Promise.all doesn't fail immediately
          resolve(img);
        };
      });
    })
  );
};
