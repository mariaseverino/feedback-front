export function Section({
    title,
    description,
    children,
}: React.PropsWithChildren<{
    title: string;
    description: string;
}>) {
    return (
        <section className="rounded-3xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
                <h2 className="text-xl font-semibold">{title}</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            <div className="p-6">{children}</div>
        </section>
    );
}
