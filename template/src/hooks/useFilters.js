import { useEffect, useState } from 'react';

function useFilters() {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({});

    const handleFilters = (e) => {
        const { name, value: search } = e.target;
        if (search) {
            setFilters({ ...filters, [name]: search });
        } else {
            const newFilters = Object.assign({}, filters);
            delete newFilters[name];
            setFilters(newFilters);
        }
    };

    useEffect(() => {
        function search(element) {
            return Object.keys(this).every((key) =>
                element[key].includes(this[key])
            );
        }
        setFilteredData(allData.filter(search, filters));
    }, [allData, filters]);

    return [filteredData, setAllData, handleFilters];
}

export { useFilters };