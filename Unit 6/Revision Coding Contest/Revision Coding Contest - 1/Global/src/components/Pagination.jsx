import React from 'react';

export default function Pagination({ page, totalPages, setPage }) {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
            </button>
            <span>{page} / {totalPages}</span>
            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
