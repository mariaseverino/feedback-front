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

export const sendFeedbackFormSchema = z.object({
    memberId: z.string(),
    category: z.enum(['positivo', 'construtivo', 'geral']),
    feedback: z.string().min(1, 'Senha obrigatória'),
    sendAnonymously: z.boolean(),
});

export type LoginData = z.infer<typeof sendFeedbackFormSchema>;

export function FeedbackModal() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(sendFeedbackFormSchema),
    });

    const categories = [
        {
            id: 'positivo',
            name: 'Positivo',
            icon: '👏',
            color: 'text-green-600',
        },
        {
            id: 'construtivo',
            name: 'Construtivo',
            icon: '💡',
            color: 'text-yellow-600',
        },
        {
            id: 'geral',
            name: 'Geral',
            icon: '💬',
            color: 'text-blue-600',
        },
    ];
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>Enviar Feedback</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Envie um feedback!</DialogTitle>
                        <DialogDescription>
                            Compartilhe um elogio ou uma dica amiga. O poder tá
                            nas suas mãos 😉
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="gap-3 grid">
                                <Label htmlFor="category">Enviar para</Label>
                                <Controller
                                    control={control}
                                    name="memberId"
                                    // defaultValue="member"
                                    render={({ field }) => (
                                        <SelectDemo
                                            itens={[
                                                {
                                                    id: 'member',
                                                    name: 'Membro',
                                                },
                                                { id: 'admin', name: 'Admin' },
                                            ]}
                                            // value={field.value}
                                            onChange={field.onChange}
                                            label="Enviar para"
                                        />
                                    )}
                                />
                            </div>
                            <div className="gap-3 grid">
                                <Label htmlFor="category">
                                    Tipo de feedback
                                </Label>
                                <Controller
                                    control={control}
                                    name="category"
                                    // defaultValue="positivo"
                                    render={({ field }) => (
                                        <SelectDemo
                                            itens={categories}
                                            // value={field.value}
                                            onChange={field.onChange}
                                            label="Tipo de feedback"
                                            // witdh="w-full"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="gap-3 grid">
                            <Label htmlFor="feedback">Seu feedback</Label>
                            <Textarea
                                placeholder="Escreva seu feedback aqui..."
                                {...register('feedback')}
                            />
                        </div>

                        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-[#6C63FF] has-[[aria-checked=true]]:bg-[#6C63FF]/20 dark:has-[[aria-checked=true]]:border-[#6C63FF] dark:has-[[aria-checked=true]]:bg-[#6C63FF]/10">
                            <Checkbox
                                id="sendAnonymously"
                                className="data-[state=checked]:border-[#6C63FF] data-[state=checked]:bg-[#6C63FF] data-[state=checked]:text-white dark:data-[state=checked]:border-[#6C63FF] dark:data-[state=checked]:bg-[#6C63FF]"
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
                        </Label>
                    </div>
                    <DialogFooter>
                        {/* <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose> */}
                        <Button type="submit" className="w-full bg-[#6C63FF]">
                            Enviar feedback
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
