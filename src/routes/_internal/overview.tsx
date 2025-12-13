import { ChartBarMultiple } from '@/components/chart-bar-multiple';
import { SectionCards } from '@/components/section-cards';
import { getMe } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_internal/overview')({
    component: RouteComponent,
});

// Estrutura para um KPI (Key Performance Indicator)
interface KpiData {
    id: string; // Identificador único
    titulo: string;
    valor: string | number;
    unidade?: string; // Ex: '%', 'feedbacks'
    descricao?: string; // Breve descrição ou tendência
}

// Estrutura para os dados do gráfico de volume
interface VolumeFeedbackMensal {
    mes: string; // Ex: 'Dez/24', 'Jan/25'
    anonimos: number;
    identificados: number;
    total: number;
}

function RouteComponent() {
    // const { data } = useQuery({
    //     queryKey: ['current_user'],
    //     queryFn: () => getMe(),
    // });

    // Lista de 4 KPIs
    const kpisMock: KpiData[] = [
        {
            id: 'taxa-anonimato',
            titulo: 'Taxa de Anonimato',
            valor: 42,
            unidade: '%',
            descricao:
                'Porcentagem de feedbacks enviados anonimamente (últimos 30 dias)',
        },
        {
            id: 'total-mes',
            titulo: 'Total de Feedbacks (Último Mês)',
            valor: 185,
            unidade: 'feedbacks',
            descricao:
                'Total de envios no mês atual (comparado a 150 no mês anterior)',
        },
        {
            id: 'media-semana',
            titulo: 'Média Diária (Última Semana)',
            valor: 6.7,
            unidade: 'envios/dia',
            descricao:
                'Média de feedbacks recebidos por dia nos últimos 7 dias',
        },
        {
            id: 'ativos-identificados',
            titulo: 'Usuários Ativos (Identificados)',
            valor: 35,
            unidade: 'usuários',
            descricao:
                'Número de usuários únicos que enviaram feedback identificado neste mês',
        },
    ];

    // Dados para o gráfico de volume (últimos 6 meses)
    const volumeFeedbackMock: VolumeFeedbackMensal[] = [
        { mes: 'Jul/25', anonimos: 65, identificados: 85, total: 150 },
        { mes: 'Ago/25', anonimos: 58, identificados: 92, total: 150 },
        { mes: 'Set/25', anonimos: 75, identificados: 110, total: 185 },
        { mes: 'Out/25', anonimos: 80, identificados: 125, total: 205 },
        { mes: 'Nov/25', anonimos: 95, identificados: 115, total: 210 },
        { mes: 'Dez/25', anonimos: 105, identificados: 100, total: 205 }, // Mês atual
    ];

    return (
        <div className="flex flex-col h-full gap-6 grow">
            <h1 className="text-3xl font-bold mb-2">Overview</h1>
            <div className="grid gap-5 grid-cols-4">
                {/* {kpisMock.map((item) => (
                    <KpiCard data={item} />
                ))} */}
                {kpisMock.map((item) => (
                    <SectionCards data={item} />
                ))}
            </div>
            <div className="h-full">
                <ChartBarMultiple />
            </div>
        </div>
    );
}

function KpiCard({ data }: { data: KpiData }) {
    // Exemplo de lógica de formatação de valor e cor
    const isPositiveTrend =
        data.id === 'total-mes' || data.id === 'media-semana';
    const trendColor = isPositiveTrend ? 'text-green-500' : 'text-red-500';
    const trendIcon = isPositiveTrend ? '▲' : '▼'; // Símbolo de seta

    return (
        <div className="backdrop-blur-lg bg-[#F8F8FF]/60 border border-[#F8F8FF]/20 shadow-2xl bg-linear-to-br from-[#F8F8FF]/20 to-[#F8F8FF]/5 rounded-lg p-6 transition duration-300 hover:shadow-2xl">
            <div className="flex justify-between items-start">
                {/* Título do KPI */}
                <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
                    {data.titulo}
                </p>
                {/* Ícone de Tendência */}
                <span className={`text-xl font-bold ${trendColor}`}>
                    {trendIcon}
                </span>
            </div>

            {/* Valor Principal */}
            <div className="mt-2 flex items-baseline">
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {data.valor}
                </p>
                <span className="ml-2 text-lg font-semibold text-gray-500 dark:text-gray-400">
                    {data.unidade}
                </span>
            </div>

            {/* Descrição / Contexto */}
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
                {data.descricao}
            </p>
        </div>
    );
}

function Card({ title, description }: { title: string; description: string }) {
    return (
        <div className="backdrop-blur-lg bg-[#F8F8FF]/10 border border-bg-[#F8F8FF]/20 shadow-2xl bg-linear-to-br from-bg-[#F8F8FF]/20 to-bg-[#F8F8FF]/5 p-5 rounded-2xl flex flex-col gap-3 col-span-1">
            <h3 className="text-sm font-semibold text-gray-700">{title}</h3>

            <p className="text-base line-clamp-2">{description}</p>
        </div>
    );
}
