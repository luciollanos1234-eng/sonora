import logo from "../../assets/logo-sonora.png";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => (
  <div className={`inline-flex items-center gap-3 ${className}`}>
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      className="size-9 object-contain"
    />

    <span className="
      font-[var(--font-display)]
      font-extrabold tracking-[0.12em]
      text-lg text-[var(--text)]
    ">
      SONORA
    </span>
  </div>
);
