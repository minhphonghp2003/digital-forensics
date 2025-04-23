import InfoBox from '@/components/ui/info-box'

function BasicCaseInfo() {
    return (
        <div>  <div className={`flex justify-between gap-4 my-6 `}>
            <InfoBox title="Overview" data={[{
                title: "Description",
                value: "This is a description of the case that is being created. It is a long description that will be used to test the case creation process."
            },
            {
                title: "Created at",
                value: "12"
            },
            {
                title: "Investigator",
                value: "2"
            },
            {
                title: "Status",
                value: "12/12/2005"
            },

            ]} className=" w-full" ></InfoBox>
            <InfoBox title="Evidence" data={[{
                title: "Hardwares",
                value: 1
            },
            {
                title: "Devices",
                value: 3
            },
            {
                title: "Networks",
                value: 5
            },
            {
                title: "Logs",
                value: 10
            },

            ]} className=" w-full" ></InfoBox>

        </div></div>
    )
}

export default BasicCaseInfo