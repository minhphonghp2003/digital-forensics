import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function TextInput({ required, title, onChange, value }: { title: string, onChange: any, value?: any, required?: boolean }) {
    return (
        <div className=" grow">
            <Label htmlFor="name" className='mb-2'>
                {title}
                {
                    required && <span className="text-red-500">*</span>}
            </Label>
            <Input required={required} onChange={onChange} value={value} className='col-span-3' />
        </div>
    )
}

export default TextInput