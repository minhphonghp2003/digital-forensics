
'use client'
import { useSearchParams } from 'next/navigation'

function SearchPage() {
    const searchParams = useSearchParams()

    const search = searchParams.get('searchKey')
    return (
        <div>{search}</div>
    )
}

export default SearchPage