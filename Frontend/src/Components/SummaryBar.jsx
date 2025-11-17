import React from "react";

const SummaryBar = ({ summary }) => {
  return (
    <>
      <div className="container mx-auto my-4 px-2 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Total tasks */}
          <div className="box">
            <h6 className="font-semibold text-gray-500">Total Tasks</h6>
            <div className="font-bold text-2xl text-blue-500">{summary.total}</div>
          </div>
          {/* Completed */}
          <div className="box">
            <h6 className="font-semibold text-gray-500">Completed</h6>
            <div className="font-bold text-2xl text-green-500">{summary.completed}</div>
          </div>

          {/* Reamining */}
          <div className="box">
            <h6 className="font-semibold text-gray-500">Remaining</h6>
            <div className="font-bold text-2xl text-orange-500">
              {summary.remaining}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryBar;
