export default function TaskCard() {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
            Day 10
          </span>
          <span className="text-sm text-gray-400">Styling</span>
        </div>
  
        {/* Topics */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Topics</h2>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span> Tailwind CSS setup
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">•</span> Component-based styling
            </li>
          </ul>
        </div>
  
        {/* Mini Task */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-base font-medium text-indigo-600 flex items-center gap-2 cursor-pointer hover:underline">
            🎯 Mini Task
          </h3>
          <p className="text-gray-700 mt-1">Styled Product Card List</p>
        </div>
      </div>
    );
  }
  