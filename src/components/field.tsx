export function Field({
    label,
    children,
}: React.PropsWithChildren<{
    label: string;
}>) {
    return (
        <div className="grid gap-2">
            <label className="text-sm font-semibold ">{label}</label>
            {children}
        </div>
    );
}
