import { Button } from './ui/button';

export function Pagination({
    currentPage,
    handlePrevious,
    handleNext,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
    handlePrevious: () => void;
    handleNext: () => void;
}) {
    return (
        <div className="flex items-center justify-end">
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="bg-muted-foreground/50"
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-muted-foreground/50"
                >
                    Proximo
                </Button>
            </div>
        </div>
    );
}
