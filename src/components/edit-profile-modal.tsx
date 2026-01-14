import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectDemo } from './selectDemo';
import { Checkbox } from './ui/checkbox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { auth } from '@/lib/auth.client';
import type { User } from '@/lib/api';
import { useState } from 'react';

export const editProfileFormSchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
    organization: z.string().min(1, 'Nome da organização obrigatório'),
});

export type EditProfileData = z.infer<typeof editProfileFormSchema>;

interface EditProfileModalProps {
    name: string;
    email: string;
    organizationName: string;
}

export function EditProfileModal({
    name,
    email,
    organizationName,
}: EditProfileModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields, isSubmitting },
    } = useForm<EditProfileData>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            name: name,
            email: email,
            organization: organizationName,
        },
    });

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    async function handleEditProfileForm(data: EditProfileData) {
        console.log('hhhhhhh');
        try {
            const updates = [];
            console.log('teste');

            // 1. Atualizar Nome (updateUser)
            if (dirtyFields.name) {
                updates.push(
                    auth.updateUser({
                        name: data.name,
                    })
                );
            }

            // 2. Atualizar Email (changeEmail)
            if (dirtyFields.email) {
                updates.push(
                    auth.changeEmail({
                        newEmail: data.email,
                        // callbackURL: '/dashboard/settings', // opcional
                    })
                );
            }

            // 3. Atualizar Organização
            if (dirtyFields.organization) {
                updates.push(
                    auth.organization.update({
                        data: { name: data.organization },
                    })
                );
            }

            // Executa todas as mudanças necessárias em paralelo
            await Promise.all(updates);

            queryClient.setQueryData(['me'], (oldData: User | undefined) => {
                if (!oldData) return undefined;

                return {
                    ...oldData, // Mantém o ID e outros campos que não mudaram
                    name: data.name, // Valor vindo do formulário
                    email: data.email, // Valor vindo do formulário
                    organizationName: data.organization,
                };
            });

            // Toast de sucesso aqui
            console.log('Perfil atualizado com sucesso!');

            setOpen(false);
        } catch (error) {
            // Tratar erro
            console.error('Erro ao atualizar:', error);
        }
    }

    function handleTest() {
        console.log('q merda');
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="">Editar</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-106.25">
                <form
                    onSubmit={handleSubmit(handleEditProfileForm, (errors) =>
                        console.log('Erros:', errors)
                    )}
                >
                    <DialogHeader>
                        <DialogTitle>Informaçoes Pessoais</DialogTitle>
                        <DialogDescription>
                            Atualize os dados da sua conta
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" {...register('name')} />
                            {errors.name && (
                                <span className="text-red-500 text-sm">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="organization">
                                Nome da organização
                            </Label>
                            <Input
                                id="organization"
                                {...register('organization')}
                            />
                            {errors.organization && (
                                <span className="text-red-500 text-sm">
                                    {errors.organization.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
