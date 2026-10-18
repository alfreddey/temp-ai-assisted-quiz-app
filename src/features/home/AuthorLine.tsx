import type { ComponentProps } from "react";
import { Avatar } from "../../components/ui";

interface AuthorLineProps {
  avatar: ComponentProps<typeof Avatar>;
  name: string;
  detail: string;
}

export function AuthorLine({ avatar, name, detail }: AuthorLineProps) {
  return (
    <div className="author">
      <Avatar size={32} {...avatar} />
      <div>
        <p className="author__name">{name}</p>
        <p className="author__detail">{detail}</p>
      </div>
    </div>
  );
}
