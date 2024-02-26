import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddCard from './AddCard';

function SearchResultsPage() {
    const [searchResults, setSearchResults] = useState([])
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards{encodeURIComponent(searchQuery)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setSearchResults(data.results);
            } catch (error) {
                console.error('Error fetching search results:', error.message);
            }
        };

        fetchSearchResults();
    }, [searchQuery, location.search]);

    return (
        <div>
            <h2>Search Results</h2>
            <p>Showing results for: {searchQuery}</p>
            <ul>
                {searchResults.map(result => (
                    <li key={result.id}>{result.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResultsPage;