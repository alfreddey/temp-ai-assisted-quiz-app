import { classNames } from "../../lib/classNames";

type AvatarSize = 24 | 32 | 36 | 40 | 56;
type AvatarTone = "lavender" | "peach" | "mint";

/** Initials scale with the avatar, matching the kit's 56px → 19px ratio. */
const INITIALS_TO_SIZE_RATIO = 0.34;

interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  /** Adds the green ring the kit uses for verified experts. */
  expert?: boolean;
  online?: boolean;
}

export function Avatar({ initials, size = 40, tone = "lavender", expert, online }: AvatarProps) {
  return (
    <span
      className={classNames("avatar", `avatar--${tone}`, expert && "avatar--expert")}
      style={{ width: size, height: size, fontSize: size * INITIALS_TO_SIZE_RATIO }}
      aria-hidden
    >
      {initials}
      {online && <span className="avatar__online" />}
    </span>
  );
}
