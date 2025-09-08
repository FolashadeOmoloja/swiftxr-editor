const LabelModal = ({ isOpen, onClose, label, setLabel, onSave, mode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[100000000]">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[35%] h-[270px] flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {mode === "edit" ? "Edit Hotspot Label" : "Add Hotspot Label"}
          </h2>
          <input
            type="text"
            placeholder="Enter label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-4 rounded bg-gray-700 border border-gray-600 text-white"
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-3 py-2 ">
            Cancel
          </button>
          <button onClick={onSave} className="px-3 py-2">
            {mode === "edit" ? "Save Changes" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabelModal;
