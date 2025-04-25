import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function TextInput({ title, onChange, value }: { title: string, onChange: any, value?: any }) {
    return (
        <div className=" ">
            <Label htmlFor="name" className='mb-2'>
                {title}
            </Label>
            <Input onChange={onChange} value={value} className='col-span-3' />
        </div>
    )
}

export default TextInput