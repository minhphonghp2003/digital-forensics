import { BsBox } from "react-icons/bs";

function infoBox({ className, data, title }: { data: any, className?: string, title?: string }) {

    return (
        <div className={`shadow p-7  rounded-lg   ${className}`}>
            <p className="flex items-center gap-3 font-bold my-4 text-xl"><BsBox color="orange" />
                {title}</p>
            <div>
                {data?.map((item: any, index: number) => {
                    return (
                        <div key={index} className="flex gap-10 flex-row my-3 justify-between">
                            <p className="">{item.title}</p>
                            <p className="text-end ">{item.value}</p>
                        </div>
                    )
                }
                )}
            </div>

        </div>
    )
}

export default infoBox