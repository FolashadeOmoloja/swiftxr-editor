import { useState } from "react";

const Header = ({
  setAddingHotspot,
  setSelectedHotspot,
  handleFile,
  modelUrl,
}) => {
  return (
    <div
      className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700 max-sm:flex-wrap"
      //   style={{ background: "red" }}
    >
      <h1 className="text-2xl font-semibold">SwiftXR Editor</h1>
      <div className="flex gap-3 items-center">
        <label className="cursor-pointer bg-gray-700 px-3 py-1 rounded">
          <span>Upload</span>
          <input
            type="file"
            accept=".glb,.gltf"
            onChange={handleFile}
            className="hidden"
          />
        </label>
        <button
          onClick={() => setAddingHotspot(true)}
          disabled={!modelUrl}
          className="bg-blue-600 px-3 py-1 rounded disabled:opacity-50"
        >
          Add Hotspot
        </button>
        <button
          onClick={() => {
            setAddingHotspot(false);
            setSelectedHotspot(null);
          }}
          className="bg-gray-600 px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Header;
