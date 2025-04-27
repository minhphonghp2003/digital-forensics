import { BsBox } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";

function infoBox({ className, data, title }: { data: any, className?: string, title?: string, }) {


    return (
        <div className={`shadow p-7 border-1 rounded-lg   ${className}`}>
            <p className="flex items-center gap-3 font-bold my-4 text-xl"><BsBox color="orange" />
                {title}</p>
            <div>
                {data?.map((item: any, index: number) => {
                    return (
                        <div key={index} className="flex gap-10 flex-row my-3 justify-between">
                            <p className="">{item.title}</p>

                            <p className="text-end flex gap-1 items-center  ">{item.value} {item.copyText && <FaRegCopy className="cursor-pointer" onClick={() => {
                                navigator.clipboard.writeText(item.copyText ?? "N/A");
                            }} color="orange" />}
                            </p>
                        </div>
                    )
                }
                )}
            </div>

        </div>
    )
}

export default infoBox