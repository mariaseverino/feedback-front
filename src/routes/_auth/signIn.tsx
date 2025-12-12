import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { auth } from '@/lib/auth.client';
import z from 'zod';
import { useNavigate } from '@tanstack/react-router';

export const loginFormSchema = z.object({
    email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
    password: z.string().min(1, 'Senha obrigatória'),
});

export type LoginData = z.infer<typeof loginFormSchema>;

export const Route = createFileRoute('/_auth/signIn')({
    component: SignIn,
    head: () => ({
        meta: [
            {
                title: 'SignIn',
            },
        ],
    }),
});

function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(loginFormSchema),
    });

    const [openAlert, setOpenAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, setIsPending] = useState(false);

    const navigate = useNavigate();

    async function handleLoginForm(credentials: LoginData) {
        await auth.signIn.email(
            {
                email: credentials.email,
                password: credentials.password,
                callbackURL: 'http://localhost:3333/',
            },
            {
                onError(context) {
                    // setErrorMessage(
                    //     context.response?.status === 400
                    //         ? 'Ops! Parece que o email ou a senha estão errados.'
                    //         : 'Ops! Algo deu errado. Estamos trabalhando para corrigir isso. Tente novamente mais tarde.'
                    // );
                    console.log(context.error.message);
                },
                onSuccess() {
                    navigate({ to: '/overview' });
                },
            }
        );
    }

    return (
        <div className="relative">
            <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-linear-to-r from-[#9796f0] to-[#fbc7d4] h-screen">
                <div className="rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl bg-linear-to-br from-white/20 to-white/5 mx-auto pb-5 pt-2 w-full max-w-sm px-5">
                    <div className="flex flex-col gap-2">
                        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-500">
                            Acesse sua conta
                        </h2>
                        <p className="text-gray-500">
                            Insira seu e-mail e senha para acessar sua conta.
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* <div className="grid w-full max-w-xl items-start gap-4"> */}

                        {/* </div> */}
                        <form
                            onSubmit={handleSubmit(handleLoginForm)}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('email')}
                                        id="email"
                                        type="text"
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
                                        placeholder="m@email.com"
                                    />
                                    {errors.email && (
                                        <p className="text-destructive text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Senha
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        {...register('password')}
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
                                    />
                                    {errors.password && (
                                        <p className="text-destructive text-sm">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Nao tem uma conta?{' '}
                            <Link
                                to="/signUp"
                                className="font-semibold text-violet-500 hover:text-violet-400"
                            >
                                Crie a sua!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* {openAlert && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 ">
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{errorMessage}</AlertTitle>
                    </Alert>
                </div>
            )} */}
        </div>
    );
}
