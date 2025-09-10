import { useDeferredValue, useState } from 'react'

export const UseDefferredValueExample = () => {
    return <SearchComponent />
}

const SearchComponent = () => {
    const [query, setQuery] = useState('')
    const deferredQuery = useDeferredValue(query)

    const handleChange = (event: any) => {
        setQuery(event.target.value)
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>useDeferredValue example</h2>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Type your search query"
            />
            <SearchResults query={deferredQuery} />
        </div>
    )
}

const SearchResults = ({ query }: { query: string }) => {
    const results = performSearch(query)
    return (
        <ul>
            {results.map((result) => (
                <li key={result.id}>{result.name}</li>
            ))}
        </ul>
    )
}

// Fake search function for demonstration
const performSearch = (query: string) => {
    // Simulate a heavy search operation with a timeout
    if (!query) return []
    const results = []
    for (let i = 0; i < 10000; i++) {
        results.push({ id: i, name: `Result for "${query}" ${i}` })
    }
    // const results = [
    //     { id: 1, name: `Result for "${query}" 1` },
    //     { id: 2, name: `Result for "${query}" 2` },
    // ]
    return results
}
