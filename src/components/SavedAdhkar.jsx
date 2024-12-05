// frontend/src/components/SavedAdhkar.jsx
import React from 'react';
import { useSelector } from 'react-redux';

export default function SavedAdhkar() {
    const savedItems = useSelector((state) => state.savedHadith.items);

    return (
        <div style={{ minHeight: '90vh' }}>
            <h2>Saved Adhkar</h2>
            {savedItems.length > 0 ? (
                savedItems.map((item, index) => (
                    <div key={index} className="card">
                        <div className="card-header">
                            Status: {item.status} Hadith
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p className="arabic-text">{item.hadithArabic}</p>
                                <p className="urdu-text">{item.hadithUrdu}</p>
                                <p>{item.hadithEnglish}</p>
                                <footer className="blockquote-footer">
                                    <cite title="Source Title">{item.bookSlug} - {item.hadithNumber}</cite>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <p>No saved items.</p>
                </div>
            )}
        </div>
    );
}
