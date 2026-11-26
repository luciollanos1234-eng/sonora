import { useState } from "react";
import fallbackCover from "../../assets/portadas/respaldo.png";

interface CoverProps {
  src: string;
  alt: string;
  className?: string;
}

const Cover = ({ src, alt, className = "" }: CoverProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError || !src ? fallbackCover : src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default Cover;
