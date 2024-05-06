import React from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionTable = () => {

    const navigate = useNavigate();

    const handleGoToBuy = () => {
        navigate('/buyToken');
      };
    
  return (
    <>
      <div className="flex justify-center items-center h-full mt-10">
        <div className="w-4/5">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">S.no</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {/* Add rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <div className="flex justify-center"> {/* Center the button */}
        <button
          type="button"
          onClick={handleGoToBuy}
          className="mt-4 relative inline-flex w-70 items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          Go To DashBoard
        </button>
      </div>
    </>
  );
};

export default TransactionTable;