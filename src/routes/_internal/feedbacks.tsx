// import { FeedbackCard } from '@/components/feedback-card';
// import { H1 } from '@/components/h1';
// import { Pagination } from '@/components/pagination';
// import { useGetReceivedsFeedback } from '@/hooks/useFeedback';
// import { createFileRoute } from '@tanstack/react-router';

// import { useState } from 'react';

// export const Route = createFileRoute('/_internal/feedbacks')({
//     component: RouteComponent,
// });

// function RouteComponent() {
//     const { data: feedbacks } = useGetReceivedsFeedback();

//     const rowsPerPage = 9;
//     const [currentPage, setCurrentPage] = useState(1);

//     const totalPages = Math.ceil((feedbacks?.length ?? 0) / rowsPerPage);

//     const start = (currentPage - 1) * rowsPerPage;
//     const limitedData = feedbacks.slice(start, start + rowsPerPage);

//     const handlePrevious = () => {
//         setCurrentPage((prev) => Math.max(prev - 1, 1));
//     };

//     const handleNext = () => {
//         setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//     };

//     return (
//         <div className="w-full flex flex-col gap-8 px-6 py-8">
//             <div className="flex justify-between">
//                 <H1>Feedback recebidos</H1>
//             </div>

//             <div className="grid grid-cols-3 gap-7 mx-auto max-w-5xl p-6">
//                 {limitedData.map((feedback) => (
//                     <FeedbackCard feedback={feedback} key={feedback.id} />
//                 ))}
//             </div>
//             <Pagination
//                 currentPage={currentPage}
//                 handleNext={handleNext}
//                 handlePrevious={handlePrevious}
//                 totalPages={totalPages}
//             />
//         </div>
//     );
// }

import { FeedbackCard } from '@/components/feedback-card';
import { H1 } from '@/components/h1';
import { Pagination } from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetReceivedsFeedback } from '@/hooks/useFeedback';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

export const Route = createFileRoute('/_internal/feedbacks')({
    component: RouteComponent,
});

type FilterType = 'ALL' | 'ELOGIO' | 'SUGESTAO' | 'CRITICA';

function RouteComponent() {
    const { data: feedbacks = [] } = useGetReceivedsFeedback();

    let isLoading = false;

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<FilterType>('ALL');
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 9;

    const filteredFeedbacks = useMemo(() => {
        return feedbacks.filter((feedback) => {
            const matchesSearch =
                feedback.content.toLowerCase().includes(search.toLowerCase()) ||
                feedback.sender?.toLowerCase().includes(search.toLowerCase());

            const matchesFilter = filter === 'ALL' || feedback.type === filter;

            return matchesSearch && matchesFilter;
        });
    }, [feedbacks, search, filter]);

    const totalPages = Math.ceil(filteredFeedbacks.length / rowsPerPage);

    const start = (currentPage - 1) * rowsPerPage;

    const paginatedFeedbacks = filteredFeedbacks.slice(
        start,
        start + rowsPerPage,
    );

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    if (isLoading) {
        return (
            <div className="w-full px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-55 rounded-2xl bg-muted animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
            <div className="flex justify-between items-center">
                <H1>Feedback recebidos</H1>
            </div>

            <div className="flex flex-col gap-4">
                <Input
                    placeholder="Buscar feedback..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md bg-white border border-primary/40"
                />

                <div className="flex gap-2 flex-wrap">
                    {['ALL', 'ELOGIO', 'SUGESTAO', 'CRITICA'].map((type) => (
                        <Button
                            key={type}
                            variant={filter === type ? 'default' : 'outline'}
                            onClick={() => {
                                setFilter(type as FilterType);
                                setCurrentPage(1);
                            }}
                        >
                            {type === 'ALL' ? 'TODOS' : type}
                        </Button>
                    ))}
                </div>
            </div>

            {!filteredFeedbacks.length ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <h3 className="text-xl font-semibold">
                        Nenhum feedback encontrado
                    </h3>

                    <p className="text-muted-foreground">
                        Tente alterar os filtros ou a busca.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedFeedbacks.map((feedback) => (
                            <FeedbackCard
                                feedback={feedback}
                                key={feedback.id}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        totalPages={totalPages}
                    />
                </>
            )}
        </div>
    );
}
