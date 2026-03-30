import clsx from "clsx"

type H1Props = {
    children: string;
    className?: string;
}

export function H1({ children, className }: H1Props) {
    return (
        <h1 className={clsx("font-syne font-medium text-cream text-3xl", className)}>
            {children}
        </h1>
    )
}