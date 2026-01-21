import { createFileRoute, redirect } from '@tanstack/react-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import z from 'zod';
import { MembersTable } from '@/components/members-table';
import { SelectDemo } from '@/components/selectDemo';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/lib/auth.client';
import { InviteTable } from '@/components/invites-table';
import type { User } from '@/lib/api';
import { Can } from '@/utils/permissions';

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
            throw redirect({ to: '/feedbacks' });
        }
    },
});

type InviteVariables = {
    email: string;
    role: 'member' | 'admin' | 'owner';
};

function RouteComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<InviteData>({
        resolver: zodResolver(inviteFormSchema),
    });

    const { data: organizations } = auth.useListOrganizations();

    const [tab, setTab] = useState<'active_members' | 'pending_members'>(
        'active_members',
    );

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
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Membros da organização</h1>
                <form
                    onSubmit={handleSubmit(handleInviteForm)}
                    className="flex gap-2"
                >
                    <Input
                        placeholder="Email do membro"
                        {...register('email')}
                        // type=''
                        // value={
                        //     (table
                        //         .getColumn('email')
                        //         ?.getFilterValue() as string) ?? ''
                        // }
                        // onChange={(event) =>
                        //     table
                        //         .getColumn('email')
                        //         ?.setFilterValue(event.target.value)
                        // }
                        className="w-72 placeholder:text-foreground"
                    />

                    <div>
                        <Controller
                            control={control}
                            name="role"
                            defaultValue="member"
                            render={({ field }) => (
                                <SelectDemo
                                    itens={[
                                        { id: 'member', name: 'Membro' },
                                        { id: 'admin', name: 'Admin' },
                                    ]}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="min-w-40"
                                />
                            )}
                        />
                    </div>
                    <Button type="submit">Enviar convite</Button>
                </form>
            </div>

            <div className="grid grid-cols-5 gap-5">
                <div className="flex flex-col col-span-1 gap-2">
                    <button
                        className={`px-3 py-1 rounded-md text-start ${tab === 'active_members' ? 'bg-card/20 font-medium' : 'hover:bg-card/10'}`}
                        onClick={() => setTab('active_members')}
                    >
                        Membros ativos
                    </button>
                    {/* <button className="px-3 py-1 rounded-md hover:bg-gray-50/20">
                        Pagamentos
                    </button> */}
                    <button
                        className={`px-3 py-1 rounded-md text-start ${tab === 'pending_members' ? 'bg-card/20 font-medium' : 'hover:bg-card/10'}`}
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
                        <div className="shadow bg-card/10 rounded-lg p-6  w-full">
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
                        <div className="shadow bg-card/10 rounded-lg p-6  w-full">
                            <InviteTable />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
