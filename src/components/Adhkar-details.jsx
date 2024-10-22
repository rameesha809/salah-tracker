import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdhkar } from '../redux/AdhkarSlice';
import AdhkarCards from './AdhkarCards';
import { setPage } from '../redux/AdhkarSlice';

import AdhkarBook from './AdhkarBook';

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
        if (data && page > 1) {
            setAllData((prevData) => {
                const newData = data.filter(item => !prevData.some(prevItem => prevItem.hadithNumber === item.hadithNumber));
                return [...prevData, ...newData];
            });
            setLoadingMore(false);
        } else if (data && page === 1) {
            setAllData(data);
        }
    }, [data, page]);
    
    const loadMore = () => {
        dispatch(setPage(page + 1)); 
    };

    if (status === 'loading' && page === 1) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div>
            {/* <div style={{display:'hidden'}}>

            <AdhkarBook />
            </div> */}
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
