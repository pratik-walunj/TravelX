import { icons, type LucideProps } from "lucide-react";
import { HelpCircle } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

/**
 * Render a Lucide icon by string name — lets our data files reference icons
 * declaratively (e.g. `icon: "Mountain"`). Falls back to a safe default.
 */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? HelpCircle;
  return <LucideIcon {...props} />;
}
