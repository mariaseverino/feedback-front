import { Field } from '@/components/field';
import { H1 } from '@/components/h1';
import { Section } from '@/components/section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMe } from '@/hooks/useMe';
import type { User } from '@/lib/api';
import { Can } from '@/utils/permissions';
import { createFileRoute } from '@tanstack/react-router';
import { Camera, ShieldAlert } from 'lucide-react';

export const Route = createFileRoute('/_internal/configuracoes')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: user } = useMe();

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
            <div className="space-y-1">
                <H1>Configurações</H1>

                <p className="text-muted-foreground">
                    Gerencie sua conta, organização e preferências.
                </p>
            </div>

            {user && (
                <div className="space-y-6 w-full">
                    <ProfileSection user={user} />

                    <ProfessionalSection user={user} />

                    <SecuritySection />

                    {/* admin */}
                    {Can(user.role, 'manage_organization') && (
                        <OrganizationSection user={user} />
                    )}
                </div>
            )}
        </div>
    );
}

function ProfileSection({ user }: { user: User }) {
    return (
        <Section
            title="Meu perfil"
            description="Gerencie suas informações pessoais"
        >
            <div className="flex flex-col gap-8 lg:flex-row">
                <div className="flex justify-center">
                    <button className="group relative">
                        <Avatar className="size-28 border-4 border-background shadow-md">
                            <AvatarImage src="https://github.com/shadcn.png" />

                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Camera className="size-5 text-white" />
                        </div>
                    </button>
                </div>

                <div className="grid flex-1 gap-4 md:grid-cols-2">
                    <Field label="Nome">
                        <Input value={user.name} />
                    </Field>

                    <Field label="Email">
                        <Input
                            disabled
                            value={user.email}
                            className="cursor-not-allowed opacity-70"
                        />
                    </Field>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button>Salvar alterações</Button>
            </div>
        </Section>
    );
}

function ProfessionalSection({ user }: { user: User }) {
    return (
        <Section
            title="Informações profissionais"
            description="Dados relacionados à sua organização"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Organização">
                    <Input disabled value={user.organizationName ?? ''} />
                </Field>

                <Field label="Cargo">
                    <Input placeholder={user.role} />
                </Field>
            </div>

            <div className="mt-6 flex justify-end">
                <Button>Salvar alterações</Button>
            </div>
        </Section>
    );
}

function SecuritySection() {
    return (
        <Section
            title="Segurança"
            description="Atualize sua senha e proteja sua conta"
        >
            <div className="grid gap-4">
                <Field label="Senha atual">
                    <Input type="password" />
                </Field>

                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nova senha">
                        <Input type="password" />
                    </Field>

                    <Field label="Confirmar nova senha">
                        <Input type="password" />
                    </Field>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Button>Atualizar senha</Button>
            </div>
        </Section>
    );
}

function OrganizationSection({ user }: { user: User }) {
    return (
        <Section
            title="Configurações da organização"
            description="Alterações afetam todos os membros"
        >
            <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nome da organização">
                        <Input value={user.organizationName ?? ''} />
                    </Field>

                    <Field label="Slug">
                        <Input />
                    </Field>
                </div>

                <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
                    <div className="flex items-start gap-4">
                        <div className="rounded-full bg-red-500/10 p-2">
                            <ShieldAlert className="size-5 text-red-500" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-semibold text-red-500">
                                Zona de perigo
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Essa ação remove permanentemente a organização e
                                todos os dados relacionados.
                            </p>
                        </div>

                        <Button variant="destructive">
                            Excluir organização
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
