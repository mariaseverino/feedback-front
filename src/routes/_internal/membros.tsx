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
import { FileSpreadsheet, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const inviteFormSchema = z.object({
    email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
    role: z.enum(['member', 'admin']),
});

export type InviteData = z.infer<typeof inviteFormSchema>;

export const Route = createFileRoute('/_internal/membros')({
    component: RouteComponent,
    beforeLoad: ({ context: { user } }) => {
        if (!Can(user.role, 'view_team')) {
            throw redirect({ to: '/visao-geral' });
        }
    },
});

type InviteVariables = {
    email: string;
    role: 'member' | 'admin';
};

function RouteComponent() {
    const [tab, setTab] = useState<'members' | 'invites'>('members');

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
            <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <H1>Membros</H1>

                    <p className="text-muted-foreground">
                        Gerencie acessos e convites da sua organização.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Field label="Convite individual">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="email@empresa.com"
                                className="w-[320px] bg-white/5 border border-primary/40"
                                id="email"
                            />

                            <Button>Convidar</Button>
                        </div>
                    </Field>

                    <div className="hidden lg:block h-8 w-px bg-border" />

                    <Field label="Importar lista">
                        <ImportCsvButton />
                    </Field>
                </div>

                {/* <div>
                    <label
                        htmlFor="email"
                        className="block text-sm/6 font-semibold"
                    >
                        Convite individual
                    </label>
                    <div className="mt-1.5 flex gap-2">
                        <input
                            // {...register('email')}
                            id="email"
                            type="text"
                            autoComplete="email"
                            className="w-96 placeholder:text-muted-foreground rounded-md bg-white/5 px-3 text-base text-muted-foreground outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 h-9"
                            placeholder="email@empresa.com"
                        />
                        <Button type="submit">Enviar convite</Button>
                    </div>
                </div> */}
            </header>

            {/* <MembersStats /> */}

            <div className="flex items-center gap-2 rounded-xl border bg-muted/40 p-1 w-fit">
                <TabButton
                    active={tab === 'members'}
                    onClick={() => setTab('members')}
                >
                    Membros ativos
                </TabButton>

                <TabButton
                    active={tab === 'invites'}
                    onClick={() => setTab('invites')}
                >
                    Convites pendentes
                </TabButton>
            </div>

            <section className="rounded-3xl border bg-white shadow-sm">
                <div className="border-b px-6 py-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <H3>
                                {tab === 'members'
                                    ? 'Membros ativos'
                                    : 'Convites pendentes'}
                            </H3>

                            <p className="text-sm text-muted-foreground">
                                {tab === 'members'
                                    ? 'Gerencie membros e permissões.'
                                    : 'Convites enviados aguardando aceite.'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-2">
                    {tab === 'members' ? <MembersTable /> : <InviteTable />}
                </div>
            </section>
        </div>
    );
}

function TabButton({
    active,
    children,
    ...props
}: React.ComponentProps<'button'> & {
    active?: boolean;
}) {
    return (
        <button
            {...props}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
            }
                `}
        >
            {children}
        </button>
    );
}

export function ImportCsvButton() {
    const [file, setFile] = useState<File | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSelectFile(file: File | null) {
        if (!file) return;

        setFile(file);
    }

    async function handleUpload() {
        if (!file) return;

        // TODO:
        // upload csv
        // parse
        // invalidate queries
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleSelectFile(e.target.files?.[0] ?? null)}
            />

            {!file ? (
                <Button
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                    className="gap-2 border border-dashed border-primary/40 rounded-md px-4 py-2 bg-primary/5 text-primaryc ho"
                >
                    <FileSpreadsheet className="size-4" />
                    Importar CSV
                </Button>
            ) : (
                <div className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FileSpreadsheet className="size-4 text-primary" />

                        <div className="leading-tight">
                            <p className="max-w-44 truncate text-sm font-medium">
                                {file.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setFile(null)}
                        className="rounded-md p-1 hover:bg-muted"
                    >
                        <X className="size-4" />
                    </button>

                    <Button size="sm" onClick={handleUpload}>
                        <Upload className="size-4" />
                        Enviar
                    </Button>
                </div>
            )}
        </>
    );
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';

import { UserPlus } from 'lucide-react';

export function InviteMemberDialog() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<InviteData>({
        resolver: zodResolver(inviteFormSchema),
        defaultValues: {
            role: 'member',
        },
    });

    const { data: organizations } = auth.useListOrganizations();

    const { mutateAsync } = useMutation({
        mutationFn: async (data: InviteData) => {
            return auth.organization.inviteMember({
                email: data.email,
                role: data.role,
                organizationId: organizations![0].id,
                resend: true,
            });
        },

        onSuccess(_, variables) {
            queryClient.invalidateQueries({
                queryKey: ['invites'],
            });
        },
    });

    async function onSubmit(data: InviteData) {
        await mutateAsync(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <UserPlus className="size-4" />
                    Convidar membro
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Convidar membro</DialogTitle>

                    <DialogDescription>
                        Envie um convite para um novo membro entrar na
                        organização.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input
                            {...register('email')}
                            placeholder="email@empresa.com"
                        />

                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Cargo</Label>

                        <Select
                            defaultValue="member"
                            onValueChange={(value) =>
                                setValue('role', value as 'member' | 'admin')
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="member">Membro</SelectItem>

                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            Enviar convite
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

import { Users, UserCheck, Mail, Shield } from 'lucide-react';
import { Field } from '@/components/field';
import { H3 } from '@/components/h3';

function StatCard({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: string | number;
    icon: React.ElementType;
}) {
    return (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>

                    <h3 className="mt-2 text-3xl font-semibold">{value}</h3>
                </div>

                <div className="rounded-xl bg-primary/10 p-2">
                    <Icon className="size-5 text-primary" />
                </div>
            </div>
        </div>
    );
}

export function MembersStats() {
    // TODO:
    // pegar da API

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total de membros" value={24} icon={Users} />

            <StatCard title="Admins" value={3} icon={Shield} />

            <StatCard title="Membros ativos" value={21} icon={UserCheck} />

            <StatCard title="Convites pendentes" value={7} icon={Mail} />
        </div>
    );
}
