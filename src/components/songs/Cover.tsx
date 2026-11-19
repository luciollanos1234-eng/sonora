interface CoverProps {
  src: string;
  alt: string;
}

export const Cover = ({ src, alt }: CoverProps) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className="aspect-square w-full rounded-[var(--radius-cover)] object-cover"
  />
);