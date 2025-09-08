import { useRef, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LabelModal from "./components/LabelModal";
import DeleteModal from "./components/DeleteModal";

const Model = ({ url, onModelPointerDown, modelRef }) => {
  const gltf = useGLTF(url);
  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      dispose={null}
      onPointerDown={onModelPointerDown}
    />
  );
};

const Hotspot = ({ pos, label, index, onSelect, selected }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 0.7 + Math.sin(clock.elapsedTime * 6 + index) * 0.08;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <group position={pos}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial emissive={selected ? "orange" : "hotpink"} />
      </mesh>
      <Html distanceFactor={8} style={{ pointerEvents: "auto" }}>
        <div className="p-[2px] bg-black/70 text-white text-[7px] rounded-sm">
          {label}
        </div>
      </Html>
    </group>
  );
};

export default function App() {
  const [modelUrl, setModelUrl] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [label, setLabel] = useState("");
  const [pendingPoint, setPendingPoint] = useState(null);
  const [addingHotspot, setAddingHotspot] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const modelRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setModelUrl(url);
  };

  const onModelPointerDown = useCallback(
    (event) => {
      if (!addingHotspot) return;
      event.stopPropagation();
      const point = event.point.clone();
      setPendingPoint(point);
      setLabel("");
      setIsEditing(false);
      setShowModal(true);
      setAddingHotspot(false);
    },
    [addingHotspot]
  );

  const addHotspot = () => {
    if (!pendingPoint) return;
    setHotspots((h) => [
      ...h,
      {
        pos: [pendingPoint.x, pendingPoint.y, pendingPoint.z],
        label: label || "Label",
      },
    ]);
    setLabel("");
    setPendingPoint(null);
    setShowModal(false);
  };

  // Edit hotspot
  const editSelected = () => {
    if (selectedHotspot === null) return;
    setIsEditing(true);
    setLabel(hotspots[selectedHotspot].label);
    setShowModal(true);
  };

  const saveEditedHotspot = () => {
    if (selectedHotspot === null) return;
    setHotspots((h) =>
      h.map((item, idx) =>
        idx === selectedHotspot ? { ...item, label: label || "Label" } : item
      )
    );
    setLabel("");
    setIsEditing(false);
    setShowModal(false);
  };

  // Delete hotspot
  const requestDelete = () => {
    if (selectedHotspot === null) return;
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setHotspots((h) => h.filter((_, idx) => idx !== selectedHotspot));
    setSelectedHotspot(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white">
      <Header
        setAddingHotspot={setAddingHotspot}
        setSelectedHotspot={setSelectedHotspot}
        handleFile={handleFile}
        modelUrl={modelUrl}
      />

      <div className="flex flex-1 relative">
        <Sidebar
          hotspots={hotspots}
          selectedHotspot={selectedHotspot}
          setSelectedHotspot={setSelectedHotspot}
          editSelected={editSelected}
          deleteSelected={requestDelete}
        />

        <div
          className={`bg-gray-900 h-full basis-[80%] bg-[url('/gridlines.svg')] bg-cover bg-center bg-no-repeat overflow-x-auto `}
        >
          <Canvas
            camera={{ position: [0, 1, 3], fov: 45 }}
            onPointerDown={(e) => (e.target.style.cursor = "grabbing")}
            onPointerUp={(e) =>
              (e.target.style.cursor = addingHotspot ? "crosshair" : "default")
            }
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />

            <Suspense fallback={null}>
              {modelUrl ? (
                <Model
                  url={modelUrl}
                  onModelPointerDown={onModelPointerDown}
                  modelRef={modelRef}
                />
              ) : (
                <mesh position={[0, 0.5, 0]}>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial />
                </mesh>
              )}

              {hotspots.map((h, i) => (
                <Hotspot
                  key={i}
                  pos={h.pos}
                  label={h.label}
                  index={i}
                  onSelect={setSelectedHotspot}
                  selected={selectedHotspot === i}
                />
              ))}
            </Suspense>

            <OrbitControls enablePan enableRotate enableZoom />
          </Canvas>
        </div>
      </div>

      <LabelModal
        isOpen={showModal}
        label={label}
        setLabel={setLabel}
        onClose={() => {
          setShowModal(false);
          setIsEditing(false);
          setPendingPoint(null);
        }}
        onSave={isEditing ? saveEditedHotspot : addHotspot}
        mode={isEditing ? "edit" : "add"}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
