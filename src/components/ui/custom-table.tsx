import { DataTable } from '@/components/ui/data-table'
import { BsBox } from 'react-icons/bs'

function CustomTable({ columns, data, title, onBtnClicked, searchKey,
    btnName }: any) {
    return (
        <div className=" shadow  rounded-xl mx-auto p-10">
            <p className='font-bold flex items-center gap-2 '> <BsBox color="orange" />{title}</p>
            <DataTable onBtnClicked={onBtnClicked} btnName={btnName} searchKey={searchKey} columns={columns} data={data} />
        </div>
    )
}

export default CustomTable