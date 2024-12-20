import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdhkar, resetData, setPage } from '../redux/AdhkarSlice';
import AdhkarCards from './AdhkarCards';

export default function Adhkardetails() {
    const dispatch = useDispatch();
    const { data, status, error, selectedBook, page } = useSelector((state) => state.adhkar);
    const [allData, setAllData] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        if (page === 1) {
            dispatch(fetchAdhkar({ page, book: selectedBook }));
        } else {
            setLoadingMore(true);
            dispatch(fetchAdhkar({ page, book: selectedBook }));
        }
    }, [dispatch, page, selectedBook]);

    useEffect(() => {
        if (data && page>1) {
            setAllData((prevData) => {
                const newData = data.filter(item =>
                    !prevData.some(prevItem => prevItem.hadithNumber === item.hadithNumber)
                );
                return [...prevData, ...newData];
            });
            setLoadingMore(false); // Reset loading state after fetching
        }else if (data && page === 1) {
            setAllData(data);
        }
    }, [data]);

    const loadMore = () => {
        setLoadingMore(true); // Set loading state before dispatch
        dispatch(setPage(page + 1));
    };

    // Effect to reset loading state if there's an error or data fetch is complete
    useEffect(() => {
        if (status === 'idle' || status === 'succeeded' || status === 'failed') {
            setLoadingMore(false);
        }
    }, [status]);

    if (status === 'loading' && page === 1) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="card">
                <AdhkarCards data={allData} />
            </div>

            <div className="d-flex justify-content-center">
                <button onClick={loadMore} className='adh-btn btn' style={{ backgroundColor: '#12467B', color: 'white' }}>
                    {loadingMore ? 'Loading more...' : 'Load More'}
                </button>
            </div>
        </div>
    );
}
