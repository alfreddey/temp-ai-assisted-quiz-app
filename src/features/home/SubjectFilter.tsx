import { Shapes } from "lucide-react";
import { SUBJECTS, type Subject } from "../../../shared/catalog";
import { SUBJECT_ICONS, SubjectChip } from "../../components/ui";

interface SubjectFilterProps {
  value: Subject | null;
  onChange: (subject: Subject | null) => void;
}

export function SubjectFilter({ value, onChange }: SubjectFilterProps) {
  return (
    <div className="chip-row" role="group" aria-label="Filter by subject">
      <SubjectChip
        label="All subjects"
        icon={Shapes}
        selected={!value}
        onClick={() => onChange(null)}
      />
      {SUBJECTS.map((subject) => (
        <SubjectChip
          key={subject}
          label={subject}
          icon={SUBJECT_ICONS[subject]}
          selected={value === subject}
          onClick={() => onChange(subject)}
        />
      ))}
    </div>
  );
}
