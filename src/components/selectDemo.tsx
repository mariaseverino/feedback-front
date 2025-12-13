import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Organization {
    id: string;
    name: string;
}
export function SelectDemo({
    organizations,
}: {
    organizations: Organization[];
}) {
    return (
        <Select>
            <SelectTrigger className="w-56">
                <SelectValue placeholder="Selecione uma organizacao" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Organizacoes</SelectLabel>
                    {organizations.map(({ id, name }) => (
                        <SelectItem value={id}>{name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
