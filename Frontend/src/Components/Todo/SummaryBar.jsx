const SummaryBar = ({ summary }) => {
  return (
    <div className="container mx-auto my-6 px-4 sm:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total tasks */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-sm font-semibold text-blue-700 mb-2">
                Total Tasks
              </h6>
              <div className="font-bold text-4xl text-blue-600">
                {summary.total}
              </div>
            </div>
            <div className="bg-blue-200 rounded-full p-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-sm font-semibold text-green-700 mb-2">
                Completed
              </h6>
              <div className="font-bold text-4xl text-green-600">
                {summary.completed}
              </div>
            </div>
            <div className="bg-green-200 rounded-full p-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Remaining */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-sm font-semibold text-orange-700 mb-2">
                Remaining
              </h6>
              <div className="font-bold text-4xl text-orange-600">
                {summary.remaining}
              </div>
            </div>
            <div className="bg-orange-200 rounded-full p-3">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBar;
