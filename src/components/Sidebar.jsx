const Sidebar = ({
  hotspots,
  selectedHotspot,
  setSelectedHotspot,
  editSelected,
  deleteSelected,
}) => {
  return (
    <div className="basis-[20%] flex-shrink-0  bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
      <h2 className="font-medium mb-2">Hotspots ({hotspots.length})</h2>
      <ul className="space-y-2 text-sm">
        {hotspots.map((h, i) => (
          <li
            key={i}
            className={`cursor-pointer px-2 py-1 rounded ${
              selectedHotspot === i ? "bg-blue-800" : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedHotspot(i)}
          >
            {h.label}
          </li>
        ))}
      </ul>

      {selectedHotspot !== null && (
        <div className="mt-4 space-y-2">
          <button
            className="w-full bg-green-600 px-3 py-1 rounded"
            onClick={editSelected}
          >
            Edit Label
          </button>
          <button
            className="w-full bg-red-600 px-3 py-1 rounded"
            onClick={deleteSelected}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
