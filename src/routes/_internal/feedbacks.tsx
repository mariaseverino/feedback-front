import { FeedbackCard } from '@/components/feedback-card';
import { H1 } from '@/components/h1';
import { Pagination } from '@/components/pagination';
import { useGetReceivedsFeedback } from '@/hooks/useFeedback';
import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';

export const Route = createFileRoute('/_internal/feedbacks')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: feedbacks } = useGetReceivedsFeedback();

    const rowsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil((feedbacks?.length ?? 0) / rowsPerPage);

    const start = (currentPage - 1) * rowsPerPage;
    const limitedData = feedbacks.slice(start, start + rowsPerPage);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex justify-between">
                <H1>Feedback recebidos</H1>
            </div>

            <div className="grid grid-cols-3 gap-7 rounded-xl mx-auto w-full p-6">
                {limitedData.map((feedback) => (
                    <FeedbackCard feedback={feedback} key={feedback.id} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                totalPages={totalPages}
            />
        </div>
    );
}
