import type { ReactNode } from 'react';

export function H3({ children }: { children: ReactNode }) {
    return <h1 className="font-semibold text-lg">{children}</h1>;
}
