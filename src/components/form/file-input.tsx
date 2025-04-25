import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function FileInputForm({ title, onChange }: { title: string, onChange?: any }) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture">{title}</Label>
            <Input type="file" onChange={onChange} />
        </div>
    )
}

export default FileInputForm