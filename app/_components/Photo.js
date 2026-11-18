import Image from "next/image";
import { PICTURES } from "../_lib/pictures";

// "3/2" -> 1.5
export function ratioToNumber(ratio = "4/5") {
  const [w, h] = String(ratio).split("/").map(Number);
  return w && h ? w / h : 0.8;
}

// A photograph slot. Shows the real photo when PICTURES has one for `pic`,
// otherwise a warm placeholder built from the item's two tones.
export default function Photo({
  tone = ["#B8B2AA", "#1C1B1A"],
  pic,
  ratio,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
  className = "",
  imgClassName = "",
  children,
}) {
  const src = pic ? PICTURES[pic] : null;
  return (
    <div
      className={`grain relative overflow-hidden ${className}`}
      style={{
        aspectRatio: ratio ? String(ratio).replace("/", " / ") : undefined,
        background: `linear-gradient(155deg, ${tone[0]} 0%, ${tone[1]} 100%)`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt=''
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <>
          <div
            aria-hidden='true'
            className={`absolute inset-0 ${imgClassName}`}
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 28% 18%, rgba(255,255,255,.22), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 105%, rgba(0,0,0,.4), transparent 65%)",
            }}
          />
        </>
      )}
      {children}
    </div>
  );
}
