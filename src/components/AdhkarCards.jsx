import React, { useEffect, useState } from 'react'
export default function Adhkardetails({data}) {
    
    return (
        <div>
                {data ? (
                    <div className="adhkar">
                        {data.map((item, index) => (
                            <div key={index} className="card">
                                <div className="card-header">
                                    Status : {item.status} Hadith
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p className="arabic-text">{item.hadithArabic}</p>
                                        <p className="urdu-text">{item.hadithUrdu}</p>
                                        <p>{item.hadithEnglish}</p>
                                        <footer className="blockquote-footer">
                                            {item.status && (
                                                <cite title="Source Title">{item.bookSlug} - {item.hadithNumber}</cite>
                                            )}
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No Adhkar data available</p>
                )}
            
        </div>
    )
}
