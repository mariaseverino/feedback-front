import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    MessageSquare,
    Shield,
    User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_internal/feedbacks')({
    component: RouteComponent,
});

export type FeedbackType = 'ELOGIO' | 'SUGESTAO' | 'CRITICA';

export interface Feedback {
    id: string;
    type: FeedbackType;
    content: string;
    anonymous: boolean;
    createdAt: Date;
    sender?: string;
}

function RouteComponent() {
    const feedbacksMock: Feedback[] = [
        {
            id: '1',
            type: 'ELOGIO',
            content:
                'Você sempre se mostra disponível para ajudar o time, isso faz muita diferença no dia a dia.',
            anonymous: false,
            sender: 'Ana Paula',
            createdAt: new Date('2025-01-05'),
        },
        {
            id: '2',
            type: 'SUGESTAO',
            content:
                'Acho que você poderia compartilhar mais o andamento das tarefas para alinhar melhor o time.',
            anonymous: true,
            createdAt: new Date('2025-01-06'),
        },
        {
            id: '3',
            type: 'CRITICA',
            content:
                'Em algumas reuniões, suas colocações acabam interrompendo outras pessoas.',
            anonymous: true,
            createdAt: new Date('2025-01-07'),
        },
        {
            id: '4',
            type: 'ELOGIO',
            content:
                'Sua organização ajuda muito quando precisamos retomar tarefas antigas.',
            anonymous: false,
            sender: 'Carlos Mendes',
            createdAt: new Date('2025-01-08'),
        },
        {
            id: '5',
            type: 'SUGESTAO',
            content: 'Talvez valha tentar delegar mais para evitar sobrecarga.',
            anonymous: false,
            sender: 'Juliana Rocha',
            createdAt: new Date('2025-01-09'),
        },
        {
            id: '6',
            type: 'CRITICA',
            content: 'Às vezes você demora a responder mensagens importantes.',
            anonymous: true,
            createdAt: new Date('2025-01-10'),
        },
        {
            id: '7',
            type: 'ELOGIO',
            content: 'Você tem uma comunicação muito clara e objetiva.',
            anonymous: false,
            sender: 'Rafael Alves',
            createdAt: new Date('2025-01-11'),
        },
        {
            id: '8',
            type: 'SUGESTAO',
            content:
                'Seria interessante envolver mais o time nas decisões iniciais.',
            anonymous: true,
            createdAt: new Date('2025-01-12'),
        },
        {
            id: '9',
            type: 'CRITICA',
            content:
                'Em alguns momentos, a postura parece um pouco defensiva diante de feedbacks.',
            anonymous: false,
            sender: 'Fernanda Lima',
            createdAt: new Date('2025-01-13'),
        },
        {
            id: '10',
            type: 'ELOGIO',
            content: 'Você lida muito bem com pressão e prazos curtos.',
            anonymous: true,
            createdAt: new Date('2025-01-14'),
        },
        {
            id: '11',
            type: 'SUGESTAO',
            content:
                'Talvez documentar melhor os processos ajude quem está chegando agora.',
            anonymous: false,
            sender: 'Lucas Ribeiro',
            createdAt: new Date('2025-01-15'),
        },
        {
            id: '12',
            type: 'CRITICA',
            content: 'Algumas entregas poderiam ter mais atenção aos detalhes.',
            anonymous: true,
            createdAt: new Date('2025-01-16'),
        },
        {
            id: '13',
            type: 'ELOGIO',
            content: 'Sua proatividade inspira outras pessoas do time.',
            anonymous: false,
            sender: 'Patrícia Gomes',
            createdAt: new Date('2025-01-17'),
        },
        {
            id: '14',
            type: 'SUGESTAO',
            content:
                'Tentar ouvir mais antes de propor soluções pode enriquecer as discussões.',
            anonymous: true,
            createdAt: new Date('2025-01-18'),
        },
        {
            id: '15',
            type: 'CRITICA',
            content:
                'Em alguns casos, o tom das mensagens pode soar mais ríspido do que o esperado.',
            anonymous: false,
            sender: 'Marcos Vinícius',
            createdAt: new Date('2025-01-19'),
        },
    ];

    const rowsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(feedbacksMock.length / rowsPerPage);

    const start = (currentPage - 1) * rowsPerPage;
    const limitedData = feedbacksMock.slice(start, start + rowsPerPage);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <h1 className="text-3xl font-bold">Feedback recebidos</h1>
            <div className="grid grid-cols-2 gap-7 rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl bg-linear-to-br from-white/20 to-white/5 mx-auto w-full p-6">
                {limitedData.map((feedback) => (
                    <FeedbackCard feedback={feedback} />
                ))}
            </div>
            <Pagination
                rowsPerPage={rowsPerPage}
                itemsLeangth={feedbacksMock.length}
                currentPage={currentPage}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
            />
        </div>
    );
}

export function Pagination({
    itemsLeangth,
    rowsPerPage,
    currentPage,
    handlePrevious,
    handleNext,
}: {
    itemsLeangth: number;
    rowsPerPage: number;
    currentPage: number;
    handlePrevious: () => void;
    handleNext: () => void;
}) {
    const totalPages = Math.ceil(itemsLeangth / rowsPerPage);

    return (
        <div className="flex items-center justify-end">
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="bg-gray-200"
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200"
                >
                    Proximo
                </Button>
            </div>
            {/* </div> */}

            {/* <div className="space-x-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-2 py-1 ${
                        currentPage === 1
                            ? 'text-gray-400'
                            : 'text-(--color-primary) hover:bg-(--color-primary)/20 cursor-pointer rounded-full'
                    }`}
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-1 ${
                        currentPage === totalPages
                            ? 'text-gray-400'
                            : 'text-(--color-primary) hover:bg-(--color-primary)/20 cursor-pointer rounded-full'
                    }`}
                >
                    <ChevronRight size={20} />
                </button>
            </div> */}
        </div>
    );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
    const getCategoryColor = (category: FeedbackType) => {
        switch (category) {
            case 'ELOGIO':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'SUGESTAO':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'CRITICA':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryIcon = (category: FeedbackType) => {
        switch (category) {
            case 'ELOGIO':
                return '👏';
            case 'SUGESTAO':
                return '💡';
            case 'CRITICA':
                return '💬';
            default:
                return '💬';
        }
    };

    return (
        <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-lg p-4">
            <div className="flex justify-between mb-4">
                <div className="flex gap-2 text-[#6C63FF]">
                    {feedback.anonymous ? (
                        <Shield className="size-5" />
                    ) : (
                        <User className="size-5" />
                    )}

                    <label className="font-bold">
                        De:{' '}
                        {feedback.anonymous ? 'Anonimo' : `${feedback.sender}`}
                    </label>
                    <div
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                            feedback.type
                        )}`}
                    >
                        {getCategoryIcon(feedback.type)} {feedback.type}
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Clock className="size-3.5 text-(--paragraph)" />
                    <label className="text-(--paragraph) text-sm">
                        22/05/2013
                    </label>
                </div>
            </div>
            <div className="flex rounded-md gap-3">
                <div>
                    <MessageSquare className="size-5 mt-1 text-[#6C63FF]" />
                </div>
                {feedback.content}
            </div>
        </div>
    );
}
