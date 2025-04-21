import { BsBox } from "react-icons/bs";

function infoBox({ className, data, title }: { data: any, className?: string, title?: string }) {

    return (
        <div className={`shadow-xl p-7  rounded-lg   ${className}`}>
            <p className="flex items-center gap-2 font-bold my-4 text-xl"><BsBox color="orange" />
                {title}</p>
            <div>
                {data?.map((item: any, index: number) => {
                    return (
                        <div key={index} className="flex flex-row my-2 justify-between">
                            <p>{item.title}</p>
                            <p>{item.value}</p>
                        </div>
                    )
                }
                )}
            </div>

        </div>
    )
}

export default infoBox