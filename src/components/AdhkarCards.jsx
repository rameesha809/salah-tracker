import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveHadithAsync, fetchSavedHadithAsync } from '../redux/savedHadithSlice';
import { FaBookmark } from 'react-icons/fa';
import ThemeSignInPage from './Auth/ThemeSignInPage';

export default function AdhkarCards({ data }) {
    const dispatch = useDispatch();
    const savedItems = useSelector((state) => state.savedHadith.items);
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.id : null;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch saved hadith only if userId is available and savedItems is empty
        if (userId && savedItems.length === 0) {
            dispatch(fetchSavedHadithAsync(userId));
        }
    }, [dispatch, userId, savedItems.length]);

    const handleClose = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleLoginSuccess = () => {
        setIsModalOpen(false); // Close the modal after successful login
    if (userId) {
        dispatch(fetchSavedHadithAsync(userId)); // Fetch saved hadith after login
    } // Close the modal after successful login
    };

    const isHadithSaved = (hadithId) => {
        if (!userId) return false; // If user is not logged in, all items are unsaved
        return savedItems.some((savedItem) => savedItem.id === hadithId);
    };

    const handleSaveClick = (item) => {
        if (!userId) {
            setIsModalOpen(true); // Show sign-in modal if user is not logged in
            return;
        }
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

            {/* Render the Sign-In Modal */}
            {isModalOpen && (
                <ThemeSignInPage
                    handleClose={handleClose} // Pass the close handler
                    onLoginSuccess={handleLoginSuccess} // Handle successful login
                />
            )}
        </div>
    );
}
