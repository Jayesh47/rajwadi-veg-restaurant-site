import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Filter() {
    return (
        <div className='flex justify-between items-end'>
            <div className="flex items-end justify-between w-1/4 mt-4">
                <label htmlFor="date-filter" className='text-xl font-semibold text-white font-sans'>Date Filter: </label>
                <input type="date" name="date-filter" id="date-filter" className='px-3 py-1 rounded-2xl' />
            </div>
            <select name="role-filter" className='h-8 px-3 rounded-2xl'>
                <option value="">-- Filter By Role --</option>
                <option value="">Manager</option>
                <option value="">Cheff</option>
                <option value="">Waiter</option>
                <option value="">Receptionists</option>
                <option value="">Security Guard</option>
            </select>
            <form method='post'>
                <input type="text" name="filter-name" className="py-1 px-4 w-[20em] rounded-2xl outline-none shadow-lg shadow-violet-500" placeholder='Filter By Employee Name...' />
                <button className="bg-gray-700 text-white px-2 py-1 rounded-2xl relative left-[-2em]"><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </div>
    )
}