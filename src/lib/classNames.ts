/** Joins the truthy class names: classNames("btn", isActive && "is-active"). */
export function classNames(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}
