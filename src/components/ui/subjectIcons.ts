import {
  Atom,
  BookOpen,
  Calculator,
  FlaskConical,
  Landmark,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import type { Subject } from "../../../shared/catalog";

export const SUBJECT_ICONS: Record<Subject, LucideIcon> = {
  Mathematics: Calculator,
  Biology: Leaf,
  Chemistry: FlaskConical,
  Physics: Atom,
  English: BookOpen,
  History: Landmark,
};
