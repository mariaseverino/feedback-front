import { auth } from '@/lib/auth.client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const Route = createFileRoute('/_auth/signUp')({
    component: SignUp,
});
export const registerFormSchema = z
    .object({
        name: z.string().min(1, 'Nome obrigatório'),
        email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
        password: z.string().min(1, 'Senha obrigatória'),
        confim_password: z.string().min(1, 'Confirmação de senha obrigatória'),
    })
    .refine((data) => data.password === data.confim_password, {
        path: ['confim_password'],
        message: 'As senhas não coincidem',
    });

export type RegisterData = z.infer<typeof registerFormSchema>;

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerFormSchema),
    });

    const navigate = useNavigate();

    async function handleRegisterForm(credentials: RegisterData) {
        await auth.signUp.email(
            {
                email: credentials.email,
                password: credentials.password,
                name: credentials.name,
                image: '',
            },
            {
                onError(context) {
                    console.log(context.error.message);
                    // setErrorMessage(
                    //     context.response?.status === 400
                    //         ? 'Ops! Parece que o email ou a senha estão errados.'
                    //         : 'Ops! Algo deu errado. Estamos trabalhando para corrigir isso. Tente novamente mais tarde.'
                    // );
                },
                onSuccess() {
                    navigate({ to: '/overview' });
                },
            }
        );
    }

    return (
        <div>
            <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-linear-to-r from-[#9796f0] to-[#fbc7d4] h-screen">
                <div className="rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl bg-linear-to-br from-white/20 to-white/5 mx-auto pb-5 pt-2 w-full max-w-sm px-5">
                    <div className="flex flex-col gap-2">
                        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-500">
                            Crie sua conta
                        </h2>
                        <p className="text-gray-500">
                            Insira seu e-mail e senha para criar sua conta.
                        </p>
                    </div>

                    <div className="mt-10">
                        <form
                            onSubmit={handleSubmit(handleRegisterForm)}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Nome
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('name')}
                                        id="name"
                                        type="name"
                                        autoComplete="name"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
                                    />
                                    {errors.name && (
                                        <p className="text-destructive text-sm">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                            </div>

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
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
                                    />
                                    {errors.email && (
                                        <p className="text-destructive text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="grid grid-cols-2 gap-4">
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
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm/6 font-medium text-gray-900"
                                            >
                                                Comfimar senha
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                {...register('confim_password')}
                                                id="confim_password"
                                                type="password"
                                                autoComplete="current-password"
                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
                                            />
                                            {errors.confim_password && (
                                                <p className="text-destructive text-sm">
                                                    {
                                                        errors.confim_password
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm mt-2">
                                    Deve ter no mínimo 8 caracteres.
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:bg-violet-500/60"
                                >
                                    Criar conta
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Ja te uma conta?{' '}
                            <Link
                                to="/signIn"
                                className="font-semibold text-violet-500 hover:text-violet-400"
                            >
                                Faca login!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* {openAlert && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 ">
                    <Alert variant="default">
                        <InfoIcon />
                        <AlertTitle>{errorMessage}</AlertTitle>
                    </Alert>
                </div>
            )} */}
        </div>
    );
}
