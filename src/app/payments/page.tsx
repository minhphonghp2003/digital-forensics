import { columns } from "./column"
import { DataTable } from "./data-table"

async function getData() {
    // Fetch data from your API here.
    return Array.from({ length: 25 }, (_, i) => {
        return {
            id: "728ed52f",
            amount: 100 * i,
            status: "pending",
            email: `m${i}@example.com`,
        }
    }
    )

}
async function page() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default page