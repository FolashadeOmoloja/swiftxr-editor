const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 min-w-[500px] flex items-center justify-center bg-black/60 z-[100000000]">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg  w-[35%] h-[250px] flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">Delete Hotspot</h2>
          <p className="text-sm text-gray-300 mb-4">
            Are you sure you want to delete this hotspot? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 !bg-red-600 rounded !hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
