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
        <Select defaultValue={organizations[0]?.id}>
            <SelectTrigger className="w-56 bg-gray-50/20">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Organizacoes</SelectLabel>
                    {organizations.map(({ id, name }) => (
                        <SelectItem
                            value={id}
                            key={id}
                            className="focus:bg-gray-100 data-[state=checked]:bg-gray-200 data-[state=checked]:text-gray-900"
                        >
                            {name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
