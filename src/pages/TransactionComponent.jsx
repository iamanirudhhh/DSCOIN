import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransactionTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transactionDetails } = location.state || {};

  const goToDashboard = () => {
    navigate('/buyToken');
  };

  const truncateString = (str) => {
    if (str.length <= 10) return str;
    return `${str.slice(0, 5)}.....${str.slice(-5)}`;
  };

  return (
    <>
      <div className="flex justify-center items-center h-full mt-10">
        <div className="w-4/5">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Transaction Hash</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody className=" align-middle">
                {transactionDetails && (
                  <tr>
                    <td className="text-center">
                      <a href={`https://sepolia.etherscan.io/tx/${transactionDetails.transactionHash}`} target="_blank" rel="noopener noreferrer">
                        {truncateString(transactionDetails.transactionHash)}
                      </a>
                    </td>
                    <td className="text-center">{truncateString(transactionDetails.from)}</td>
                    <td className="text-center">{truncateString(transactionDetails.to)}</td>
                    <td className="text-center">{transactionDetails.amount}</td>
                  </tr>
                  
                )}
                <br/>
                <tr> 
                  <td className="border-t border-gray-400" colSpan="4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={goToDashboard}
          className="mt-4 relative inline-flex w-70 items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
        >
          Go To DashBoard
        </button>
      </div>
    </>
  );
};

export default TransactionTable;