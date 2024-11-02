import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveHadithAsync, fetchSavedHadithAsync } from '../redux/savedHadithSlice';
import { FaBookmark } from 'react-icons/fa';

export default function AdhkarCards({ data }) {
    const dispatch = useDispatch();
    const savedItems = useSelector((state) => state.savedHadith.items);
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.id : null;

    useEffect(() => {
        // Fetch saved hadith only if userId is available and savedItems is empty
        if (userId && savedItems.length === 0) {
            dispatch(fetchSavedHadithAsync(userId));
        }
    }, [dispatch, userId, savedItems.length]);

    const isHadithSaved = (hadithId) => {
        return savedItems.some((savedItem) => savedItem.id === hadithId);
    };

    const handleSaveClick = (item) => {
        dispatch(toggleSaveHadithAsync({ userId, hadithId: item.id, hadithData: item }));
    };

    return (
        <div>
            {data.length > 0 ? (
                <div className="adhkar">
                    {data.map((item) => {
                        const isSaved = isHadithSaved(item.id);

                        return (
                            <div key={item.id} className="card">
                                <div className="card-header">
                                    Status: {item.status} Hadith
                                    <div
                                        onClick={() => handleSaveClick(item)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            padding: '8px',
                                            backgroundColor: isSaved ? '#12467b' : 'lightgray',
                                            float: 'right',
                                        }}
                                    >
                                        <FaBookmark
                                            style={{
                                                fontSize: '1.5em',
                                                color: isSaved ? 'yellow' : 'gray',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p className="arabic-text">{item.hadithArabic}</p>
                                        <p className="urdu-text">{item.hadithUrdu}</p>
                                        <p>{item.hadithEnglish}</p>
                                        <footer className="blockquote-footer">
                                            {item.status && (
                                                <cite title="Source Title">
                                                    {item.bookSlug} - {item.hadithNumber}
                                                </cite>
                                            )}
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No Adhkar data available</p>
            )}
        </div>
    );
}
