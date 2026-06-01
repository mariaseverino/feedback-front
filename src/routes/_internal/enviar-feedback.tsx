import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendFeedback } from '@/hooks/useFeedback';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { H1 } from '@/components/h1';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Field } from '@/components/field';

export const Route = createFileRoute('/_internal/enviar-feedback')({
    component: RouteComponent,
});

export const sendFeedbackFormSchema = z.object({
    memberId: z.string(),
    category: z.enum(['positivo', 'construtivo', 'geral']),
    feedback: z.string().min(1, 'Senha obrigatória'),
    sendAnonymously: z.boolean(),
});

export type SendFeedbackFormSchema = z.infer<typeof sendFeedbackFormSchema>;

function RouteComponent() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SendFeedbackFormSchema>({
        resolver: zodResolver(sendFeedbackFormSchema),
    });

    const members = [
        {
            id: 'member',
            name: 'Membro',
            email: 'membro@email.com',
        },
        {
            id: 'admin',
            name: 'Admin',
            email: 'admin@email.com',
        },
    ];

    const [open, setOpen] = useState(false);

    const { mutateAsync: sendFeedbackFn } = useSendFeedback();

    async function handleSendFeedbackForm(credentials: SendFeedbackFormSchema) {
        // await sendFeedbackFn({
        //     email: credentials.email,
        //     role: credentials.role,
        // });
        // setValue('email', '');
        // setTab('pending_members');

        console.log(credentials);
    }

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8">
            <div>
                <H1>Envie um feedback!</H1>
                <p className="text-lg mb-4 text-muted-foreground">
                    Compartilhe um elogio ou uma dica amiga. O poder tá nas suas
                    mãos 😉
                </p>
            </div>

            <div className="rounded-3xl border bg-white shadow-sm p-7 mx-auto flex max-w-5xl">
                <form
                    onSubmit={handleSubmit(handleSendFeedbackForm)}
                    className="flex flex-col gap-5"
                >
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Field label="Tipo de feedback">
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <CategorySelector field={field} />
                                    )}
                                />
                            </Field>

                            <Field label="Enviar para">
                                <Controller
                                    control={control}
                                    name="memberId"
                                    render={({ field }) => (
                                        <MembersAvaliable
                                            field={field}
                                            members={members}
                                            open={open}
                                            setOpen={setOpen}
                                        />
                                    )}
                                />
                            </Field>
                        </div>
                        <Field label="Seu feedback">
                            <textarea
                                className="text-muted-foreground focus-visible:primary/50 min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs md:text-sm placeholder:text-muted-foreground border-input focus:outline-2 focus:border-primary/30 focus:border focus:-outline-offset-3 p-4 outline-hidden hover:ring-primary"
                                placeholder="Escreva seu feedback aqui..."
                                {...register('feedback')}
                            />
                        </Field>

                        <label className="flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary has-aria-checked:bg-primary/20 bg-primary/10 hover:bg-primary/15">
                            <Checkbox
                                id="sendAnonymously"
                                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white border-primary "
                                {...register('sendAnonymously')}
                            />
                            <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    Enviar anonimamente
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    Se marcada, o destinatário não saberá quem
                                    enviou.
                                </p>
                            </div>
                        </label>
                    </div>
                    <div>
                        <Button type="submit" className="w-full bg-primary">
                            Enviar feedback
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function MembersAvaliable({
    members,
    open,
    setOpen,
    field,
}: {
    members: { id: string; name: string; email: string }[];
    open: boolean;
    setOpen: (value: boolean) => void;
    field: any;
}) {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    role="combobox"
                    className="w-full h-9 px-3 flex items-center justify-between rounded-md
                     border border-input text-sm text-left
                     hover:bg-accent transition-colors"
                >
                    {field.value ? (
                        members.find((m) => m.id === field.value)?.name
                    ) : (
                        <span className="text-muted-foreground">
                            Buscar membro...
                        </span>
                    )}
                    <ChevronsUpDown className="size-3.5 text-muted-foreground" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-114 p-0">
                <Command>
                    <CommandInput placeholder="Nome ou email..." />
                    <CommandList>
                        <CommandEmpty>Nenhum membro encontrado.</CommandEmpty>
                        <CommandGroup>
                            {members.map((member) => (
                                <CommandItem
                                    key={member.id}
                                    value={member.name}
                                    onSelect={() => {
                                        field.onChange(member.id);
                                        setOpen(false);
                                    }}
                                    className="data-[selected=true]:bg-primary/10"
                                >
                                    <div>
                                        <p className="text-sm font-medium ">
                                            {member.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {member.email}
                                        </p>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function CategorySelector({ field }: { field: any }) {
    const categories = [
        {
            id: 'positivo',
            name: 'Positivo',
            icon: '👏',
            color: 'text-green-600',
            activeBg: 'bg-green-600/10 border-green-600',
        },
        {
            id: 'construtivo',
            name: 'Construtivo',
            icon: '💡',
            color: 'text-yellow-600',
            activeBg: 'bg-yellow-600/10 border-yellow-600',
        },
        {
            id: 'geral',
            name: 'Geral',
            icon: '💬',
            color: 'text-blue-600',
            activeBg: 'bg-blue-600/10 border-blue-600',
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    type="button"
                    onClick={() => field.onChange(cat.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all
            ${
                field.value === cat.id
                    ? `${cat.activeBg}`
                    : 'border-border hover:bg-primary/5'
            } ${cat.color}`}
                >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-xs font-medium">{cat.name}</span>
                </button>
            ))}
        </div>
    );
}
