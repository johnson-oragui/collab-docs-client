import { useState, useEffect } from 'react';

const DUMMY_DOCS = [
  { id: '1', name: 'Project Roadmap 2025', owner: 'Alice' },
  { id: '2', name: 'Design System Specs', owner: 'Bob' },
  { id: '3', name: 'Marketing Strategy', owner: 'Alice' },
];

const DUMMY_USERS = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com' },
];

const EMPTY_RESULTS = {
  docs: [] as typeof DUMMY_DOCS,
  collaborators: [] as typeof DUMMY_USERS,
};

export function useSearch(query: string) {
  const [results, setResults] = useState(EMPTY_RESULTS);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState('');

  useEffect(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return;
    }

    const timer = setTimeout(() => {
      const filteredDocs = DUMMY_DOCS.filter((d) =>
        d.name.toLowerCase().includes(q),
      );

      const docsFromUsers = DUMMY_DOCS.filter((d) =>
        d.owner.toLowerCase().includes(q),
      );

      const collaborators = DUMMY_USERS.filter((u) =>
        u.name.toLowerCase().includes(q),
      );

      const docs = Array.from(
        new Map(
          [...filteredDocs, ...docsFromUsers].map((d) => [d.id, d]),
        ).values(),
      );

      setResults({ docs, collaborators });
      setSearchedQuery(q);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const normalizedQuery = query.trim().toLowerCase();

  const isLoading =
    normalizedQuery.length > 0 && searchedQuery !== normalizedQuery;

  return {
    results: normalizedQuery ? results : EMPTY_RESULTS,
    isLoading,
  };
}
