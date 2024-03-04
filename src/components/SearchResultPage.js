import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResultsPage() {
    const [allCards, setAllCards] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchAllCards = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch all cards');
                }
                const data = await response.json();
                setAllCards(data);
            } catch (error) {
                console.error('Error fetching all cards:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCards();
    }, []);

    useEffect(() => {
        const filteredResults = allCards.filter(card => {
            const lowerCaseSearchQuery = searchQuery?.toLowerCase() || '';
            return (
                (card.title?.toLowerCase() || '').includes(lowerCaseSearchQuery) ||
                (card.subtitle?.toLowerCase() || '').includes(lowerCaseSearchQuery) ||
                (card.description?.toLowerCase() || '').includes(lowerCaseSearchQuery) ||
                (card.phone?.toLowerCase() || '').includes(lowerCaseSearchQuery) ||
                (card.email?.toLowerCase() || '').includes(lowerCaseSearchQuery) ||
                (card.web?.toLowerCase() || '').includes(lowerCaseSearchQuery)
            );
        });

        setSearchResults(filteredResults);
    }, [searchQuery, allCards]);
    if (loading) {
        return <div>Loading...</div>;
    }

    console.log("Search Results:", searchResults);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>Search Results</h2>
            <p>Showing results for: {searchQuery}</p>
            <ul>
                {searchResults.map(card => (
                    <li key={card.id}>
                        <h3>Title: {card.title}</h3>
                        <p>Subtitle: {card.subtitle}</p>
                        <p>Description: {card.description}</p>
                        <p>Phone: {card.phone}</p>
                        <p>Email: {card.email}</p>
                        <p>Website: {card.web}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResultsPage;