// hooks/useImage.js
import { useMemo } from "react";

const useImage = (putanja) => {
  return useMemo(() => {
    if (!putanja) return "/default-image.jpg";
    if (putanja.startsWith("http://") || putanja.startsWith("https://")) {
      return putanja;
    }
    return `http://localhost:5000${putanja}`;
  }, [putanja]);
};

export default useImage;
