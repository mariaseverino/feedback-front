import { DeleteAccountAlert } from '@/components/delete-account-alert';
import { EditProfileModal } from '@/components/edit-profile-modal';

import { useMe } from '@/hooks/useMe';
import { auth } from '@/lib/auth.client';
import { roleMap } from '@/utils/roleMap';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_internal/settings')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: user } = useMe();

    const navigate = useNavigate();

    async function handleDeleteAccount() {
        await auth
            .deleteUser()
            .then(() => navigate({ to: '/signIn' }))
            .catch(() => console.log('erro'));
    }

    return (
        <div className="flex flex-col h-full gap-6 grow">
            <h1 className="text-3xl font-bold mb-2">Configurações</h1>
            <div className="grid grid-cols-5 gap-5">
                <div className="flex flex-col col-span-1 gap-2">
                    <div
                        className={`px-3 py-1 rounded-md text-start bg-card/20 font-medium`}
                        // onClick={() => setTab('profile')}
                    >
                        Perfil
                    </div>
                    {/* <button className="px-3 py-1 rounded-md hover:bg-gray-50/20">
                        Pagamentos
                    </button> */}
                    {/* <button
                        className={`px-3 py-1 rounded-md text-start ${tab === 'theme' ? 'bg-card/20 font-medium' : 'hover:bg-card/10'}`}
                        onClick={() => setTab('theme')}
                    >
                        Tema
                    </button> */}
                </div>

                <div className="col-span-4 border-l pl-5">
                    <h2 className="text-3xl font-semibold">Perfil</h2>
                    <p className="text-lg mb-4 text-muted-foreground">
                        Gerencie suas informações pessoais
                    </p>
                    <div className="rounded-xl shadow bg-card/10 mx-auto w-full p-6 grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="nome"
                                className="block text-sm/6 font-medium "
                            >
                                Nome
                            </label>
                            <div className="text-muted-foreground">
                                {user?.name}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium"
                            >
                                Email
                            </label>
                            <div className="text-muted-foreground">
                                {user?.email}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="organization"
                                className="block text-sm/6 font-medium"
                            >
                                Organizacao
                            </label>
                            <div className="text-muted-foreground">
                                {user?.organizationName}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm/6 font-medium"
                            >
                                Cargo
                            </label>
                            <div className="text-muted-foreground">
                                {roleMap[user?.role as keyof typeof roleMap]}
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-end">
                            <EditProfileModal
                                email={user?.email!}
                                name={user?.name!}
                                organizationName={user?.organizationName!}
                            />
                        </div>
                    </div>

                    <DeleteAccountAlert
                        handleDeleteAccount={handleDeleteAccount}
                    />
                </div>
            </div>
        </div>
    );
}
