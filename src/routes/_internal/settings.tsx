import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/_internal/settings')({
    component: RouteComponent,
});

function RouteComponent() {
    const [theme, setTheme] = useState('light');
    const [tab, setTab] = useState<'profile' | 'theme'>('profile');

    const handleChangeTheme = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (newTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
        // toast({
        //     title: 'Tema alterado',
        //     description: `Tema ${newTheme === 'system' ? 'do sistema' : newTheme} aplicado.`,
        // });
    };

    return (
        <div className="flex flex-col h-full gap-6 grow">
            <h1 className="text-3xl font-bold mb-2">Configurações</h1>
            <div className="grid grid-cols-5 gap-5">
                <div className="flex flex-col col-span-1 gap-2">
                    <button
                        className={`px-3 py-1 rounded-md text-start ${tab === 'profile' ? 'bg-[#F8F8FF]/70 font-medium' : 'hover:bg-gray-50/20'}`}
                        onClick={() => setTab('profile')}
                    >
                        Perfil
                    </button>
                    {/* <button className="px-3 py-1 rounded-md hover:bg-gray-50/20">
                        Pagamentos
                    </button> */}
                    <button
                        className={`px-3 py-1 rounded-md text-start ${tab === 'theme' ? 'bg-[#F8F8FF]/70 font-medium' : 'hover:bg-gray-50/20'}`}
                        onClick={() => setTab('theme')}
                    >
                        Tema
                    </button>
                </div>

                {tab == 'profile' && (
                    <div className="col-span-4 border-l pl-5">
                        <h2 className="text-3xl font-semibold text-gray-800">
                            Perfil
                        </h2>
                        <p className="text-lg mb-4 text-gray-800">
                            Gerencie suas informações pessoais
                        </p>
                        <div className="rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl bg-linear-to-br from-white/20 to-white/5 mx-auto w-full p-6 grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="nome"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Nome
                                </label>
                                <div>Maria Rita de Souza Severino</div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <div>mariarsseverino@gmail.com</div>
                            </div>
                            <div>
                                <label
                                    htmlFor="organization"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Organizacao
                                </label>
                                <div>Motiro</div>
                            </div>
                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Cargo
                                </label>
                                <div>Owner</div>
                            </div>

                            <div className="col-span-2 flex justify-end">
                                <Button
                                    className="bg-[#F8F8FF]/70 text-gray-700"
                                    variant="outline"
                                >
                                    Editar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* <div>
                    <RadioGroup defaultValue="comfortable">
                        <Card>

                        </Card>
                        <div className="flex items-center gap-3 bg-amber-500 ">
                            <RadioGroupItem value="default" id="r1" />
                            <Label htmlFor="r1">Default</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2">Comfortable</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="compact" id="r3" />
                            <Label htmlFor="r3">Compact</Label>
                        </div>
                    </RadioGroup>
                </div> */}

                {tab === 'theme' && (
                    <div className="space-y-6 col-span-4 border-l pl-5">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800">
                                Aparência
                            </h2>
                            <p className="text-lg mb-4 text-gray-800">
                                Personalize a aparência do sistema
                            </p>
                        </div>

                        {/* <Card className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl bg-linear-to-br from-white/20 to-white/5 dark:bg-white/10 dark:border-white/20 dark:from-white/20 dark:to-white/5"> */}
                        <Card className="w-96 p-8 rounded-xl bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl text-white">
                            <CardHeader>
                                <CardTitle>Tema</CardTitle>
                                <CardDescription className="text-gray-800">
                                    Escolha o tema que prefere usar no sistema
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <button
                                        onClick={() =>
                                            handleChangeTheme('light')
                                        }
                                        className={`group relative flex flex-col items-center gap-4 rounded-lg border-2 p-6 transition-all ${
                                            theme === 'light'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                        }`}
                                    >
                                        {theme === 'light' && (
                                            <div className="absolute right-4 top-4">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                                    <Check className="h-4 w-4 text-primary-foreground" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="h-32 w-full overflow-hidden rounded-md border border-border bg-linear-to-r from-[#9796f0] to-[#fbc7d4]">
                                            <div className="h-8 border-gray-200 bg-linear-to-r from-[#9796f0] to-[#fbc7d4]" />
                                            <div className="p-4">
                                                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                                                <div className="h-3 w-1/2 rounded bg-gray-100" />
                                            </div>
                                        </div>
                                        <span className="font-medium text-foreground">
                                            Padrao
                                        </span>
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleChangeTheme('dark')
                                        }
                                        className={`group relative flex flex-col items-center gap-4 rounded-lg border-2 p-6 transition-all ${
                                            theme === 'dark'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                        }`}
                                    >
                                        {theme === 'dark' && (
                                            <div className="absolute right-4 top-4">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                                    <Check className="h-4 w-4 text-primary-foreground" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="h-32 w-full overflow-hidden rounded-md border border-gray-700 bg-gray-900">
                                            <div className="h-8 border-b border-gray-800 bg-gray-950" />
                                            <div className="p-4">
                                                <div className="mb-2 h-4 w-3/4 rounded bg-gray-700" />
                                                <div className="h-3 w-1/2 rounded bg-gray-800" />
                                            </div>
                                        </div>
                                        <span className="font-medium text-foreground">
                                            Escuro
                                        </span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
