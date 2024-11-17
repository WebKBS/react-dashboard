import { cn } from "@/lib/utils.ts";
import { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}
const Container = ({
  className,
  children,
}: PropsWithChildren<ContainerProps>) => {
  return <div className={cn("py-4 px-6 w-full", className)}>{children}</div>;
};

export default Container;
