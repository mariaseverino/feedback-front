import { createFileRoute, redirect } from '@tanstack/react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

import z from 'zod';
import { MembersTable } from '@/components/members-table';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/lib/auth.client';
import { InviteTable } from '@/components/invites-table';
import type { User } from '@/lib/api';
import { Can } from '@/utils/permissions';
import { H1 } from '@/components/h1';
import { FileSpreadsheet, X } from 'lucide-react';

export const inviteFormSchema = z.object({
    email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
    role: z.enum(['member', 'admin']),
});

export type InviteData = z.infer<typeof inviteFormSchema>;

export const Route = createFileRoute('/_internal/members')({
    component: RouteComponent,
    beforeLoad: ({ context }) => {
        const user = context.user as User;
        if (!Can(user.role, 'view_dashboard')) {
            // throw redirect({ to: '/feedbacks' });
        }
    },
});

type InviteVariables = {
    email: string;
    role: 'member' | 'admin';
};

function RouteComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<InviteData>({
        resolver: zodResolver(inviteFormSchema),
    });

    const { data: organizations } = auth.useListOrganizations();

    const [tab, setTab] = useState<'active_members' | 'pending_members'>(
        'active_members',
    );

    const [csvFile, setCsvFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const queryClient = useQueryClient();

    const { mutateAsync: sendInviteFn } = useMutation({
        mutationFn: (data: InviteVariables) =>
            auth.organization.inviteMember({
                email: data.email,
                role: data.role,
                organizationId: organizations![0].id,
                resend: true,
            }),
        onSuccess(_, variables) {
            queryClient.setQueryData(['invites'], (data: any) => {
                return [
                    ...data,
                    {
                        id: crypto.randomUUID(),
                        email: variables.email,
                        role: variables.role,
                        createdAt: new Date().toISOString(),
                    },
                ];
            });

            setTab('pending_members');
        },
        onError(error) {
            alert('deu errro');
            console.log(error);
        },
    });

    // TODO: fazer funcao para lidar com requisicao do arquivo

    async function handleInviteForm(credentials: InviteData) {
        await sendInviteFn({
            email: credentials.email,
            role: credentials.role,
        });
        setValue('email', '');
        setTab('pending_members');
    }

    return (
        <div className="w-full flex flex-col gap-8">
            <H1>Membros da organização</H1>
            <div className="flex gap-8 items-end justify-end">
                <form
                    onSubmit={handleSubmit(handleInviteForm)}
                    className="flex gap-2 flex-col "
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-semibold"
                        >
                            Convite individual
                        </label>
                        <div className="mt-1.5 flex gap-2">
                            <input
                                {...register('email')}
                                id="email"
                                type="text"
                                autoComplete="email"
                                className="w-96 placeholder:text-muted-foreground rounded-md bg-white/5 px-3 text-base text-muted-foreground outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 h-9"
                                placeholder="email@empresa.com"
                            />
                            <Button type="submit">Enviar convite</Button>
                        </div>
                    </div>
                </form>

                <div className="mb-2">ou</div>

                {!csvFile ? (
                    <div
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-3 border border-dashed border-primary/40 rounded-md px-4 py-2 bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors"
                    >
                        <input
                            ref={fileRef}
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={(e) =>
                                setCsvFile(e.target.files?.[0] ?? null)
                            }
                        />
                        <FileSpreadsheet className="size-4 text-primary" />
                        <div>
                            <p className="text-sm text-primary">
                                Importar lista de emails
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Apenas .csv · máx. 5 MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
                        <FileSpreadsheet className="size-4 text-primary" />
                        <div className="flex-1">
                            <p className="text-xs font-medium">
                                {csvFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {(csvFile.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                        <button onClick={() => setCsvFile(null)}>
                            <X className="size-3" />
                        </button>
                        <Button size="sm" onClick={() => {}}>
                            Enviar
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-5 gap-5">
                <div className="flex flex-col col-span-1 gap-2">
                    <button
                        className={`px-3 py-1 rounded-md text-start ${tab === 'active_members' ? 'bg-primary text-white font-medium' : 'hover:bg-black/5'}`}
                        onClick={() => setTab('active_members')}
                    >
                        Membros ativos
                    </button>

                    <button
                        className={`px-3 py-1 rounded-md text-start ${tab === 'pending_members' ? 'bg-primary text-white font-medium' : 'hover:bg-black/5'}`}
                        onClick={() => setTab('pending_members')}
                    >
                        Convites pendentes
                    </button>
                </div>

                {tab === 'active_members' && (
                    <div className="col-span-4 border-l pl-5">
                        <h2 className="text-3xl font-semibold">
                            Membros ativos
                        </h2>
                        <p className="text-lg mb-4 text-muted-foreground">
                            Gerencie os membros da sua organização
                        </p>
                        <div className="bg-white rounded-lg p-6  w-full">
                            <MembersTable />
                        </div>
                    </div>
                )}

                {tab === 'pending_members' && (
                    <div className="col-span-4 border-l pl-5">
                        <h2 className="text-3xl font-semibold">
                            Convites pendentes
                        </h2>
                        <p className="text-lg mb-4 text-muted-foreground">
                            Gerencie os convites pendentes
                        </p>
                        <div className="bg-white rounded-lg p-6  w-full">
                            <InviteTable />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
