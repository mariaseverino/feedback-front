import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Item {
    id: string;
    name: string;
}

interface SelectDemoProps {
    itens: Item[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    className?: string;
}

export function SelectDemo({
    itens,
    value,
    onChange,
    label,
    className,
}: SelectDemoProps) {
    return (
        <Select
            // defaultValue={itens[0]?.id}
            value={value}
            onValueChange={onChange}
        >
            <SelectTrigger className={`w-full bg-gray-50/20 ${className}`}>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {itens.map(({ id, name }) => (
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
