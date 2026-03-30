import { cn } from "@/lib/utils";

type H2Props = {
    children: string;
    className?: string;
}

export function H2({ children, className }: H2Props) {
    return (
        <h2 className={cn("font-meow font-medium text-cream text-2xl", className)}>
            {children}
        </h2>
    )
}