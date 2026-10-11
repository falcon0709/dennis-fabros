import StackIcon from "tech-stack-icons";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { TECH_ICONS, type TechIconSource, type TechName } from "@/data/techStack";

type TechIconProps = {
  name: TechName;
  className?: string;
};

const TechIcon = ({ name, className }: TechIconProps) => {
  const source: TechIconSource = TECH_ICONS[name];

  if ("stackIcon" in source) {
    return <StackIcon name={source.stackIcon} variant="dark" className={cn("block w-full h-full", className)} />;
  }

  return <Icon icon={source.iconify} aria-hidden className={cn("w-full h-full", source.iconClassName, className)} />;
};

export default TechIcon;
