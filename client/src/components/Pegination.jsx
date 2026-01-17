import React from 'react'

const Pegination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };
    return (
        <div className='flex m-3 p-3 items-center justify-center flex-row'>
            <nav className=''>
                <ul className='flex flex-row m-2 justify-between min-w-full '>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="border rounded-2xl m-2 p-3" onClick={goToPrevPage}>
                            Previous
                        </button>
                    </li>

                    {pageNumbers.map(pgNumber => (
                        <li
                            key={pgNumber}
                            className={`page-item ${currentPage === pgNumber ? 'active' : ''} `}
                        >
                            <button onClick={() => setCurrentPage(pgNumber)} className='m-2 p-3 border rounded-2xl'>
                                {pgNumber}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === nPages ? 'disabled' : ''}`}>
                        <button className="border rounded-2xl m-2 p-3" onClick={goToNextPage}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pegination