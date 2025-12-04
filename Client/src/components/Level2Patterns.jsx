// src/components/SortingGame.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const shapesData = [
  { id: 1, type: "circle", color: "#A855F7", size: "small" },
  { id: 2, type: "square", color: "#3B82F6", size: "medium" },
  { id: 3, type: "circle", color: "#10B981", size: "large" },
  { id: 4, type: "square", color: "#F472B6", size: "small" },
  { id: 5, type: "circle", color: "#FBBF24", size: "medium" },
  { id: 6, type: "square", color: "#3B82F6", size: "large" },
];

const getCorrectBox = (shape, sortBy) => {
  switch (sortBy) {
    case "color": return shape.color;
    case "shape": return shape.type;
    case "size": return shape.size;
    default: return shape.type;
  }
};

export default function SortingGame() {
  const [sortBy, setSortBy] = useState("color");
  const [boxes, setBoxes] = useState({});
  const [draggedShape, setDraggedShape] = useState(null);
  const [feedback, setFeedback] = useState("");

  const boxOptions = [...new Set(shapesData.map(shape => getCorrectBox(shape, sortBy)))];

  // Initialize boxes once per sortBy
  useEffect(() => {
    const newBoxes = {};
    boxOptions.forEach(opt => {
      newBoxes[opt] = [];
    });
    setBoxes(newBoxes);
    setFeedback("");
    setDraggedShape(null);
  }, [sortBy]); // يتغير فقط عند تغيير sortBy

  const handleDragStart = (shape) => {
    setDraggedShape(shape);
    setFeedback("");
  };

  const handleDrop = (boxType) => {
    if (!draggedShape) return;
    const correctBox = getCorrectBox(draggedShape, sortBy);

    if (boxType === correctBox) {
      if (!boxes[boxType].some(s => s.id === draggedShape.id)) {
        setBoxes(prev => ({
          ...prev,
          [boxType]: [...prev[boxType], draggedShape],
        }));
      }
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Try Again!");
    }
    setDraggedShape(null);
  };

  // مستوى كامل إذا كل عنصر موجود في صندوقه الصحيح
  const isLevelComplete = shapesData.every(shape =>
    boxes[getCorrectBox(shape, sortBy)]?.some(s => s.id === shape.id)
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 font-poppins">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Sort the shapes!
      </h2>

      <div className="mb-6">
        <label className="text-gray-300 font-semibold mr-3">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-700 text-white px-3 py-1 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="color">Color</option>
          <option value="shape">Shape</option>
          <option value="size">Size</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {shapesData.map(shape => (
          <div
            key={shape.id}
            draggable
            onDragStart={() => handleDragStart(shape)}
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-grab shadow-lg rounded"
          >
            <Shape shape={shape} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-6 mb-6">
        {boxOptions.map(boxType => (
          <div
            key={boxType}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(boxType)}
            className="w-24 h-24 md:w-32 md:h-32 bg-white/10 border-2 border-gray-500 rounded-xl flex items-center justify-center"
          >
            {boxes[boxType]?.map(s => <Shape key={s.id} shape={s} />)}
          </div>
        ))}
      </div>

      {feedback && (
        <p className={`text-xl md:text-2xl font-semibold mb-4 ${feedback.includes("✅") ? "text-green-400" : "text-red-400"}`}>
          {feedback}
        </p>
      )}

      {isLevelComplete && (
        <div className="text-center mt-6">
          <p className="text-3xl md:text-4xl font-bold text-green-400 mb-3">
            🎉 Level Complete!
          </p>
          <Link
            to="/levels"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg"
          >
            Back to Levels
          </Link>
        </div>
      )}
    </div>
  );
}

function Shape({ shape }) {
  const commonClasses = "w-12 h-12 md:w-16 md:h-16";
  switch(shape.type) {
    case "circle":
      return <div className={`${commonClasses} rounded-full`} style={{ backgroundColor: shape.color }} />;
    case "square":
      return <div className={`${commonClasses} rounded`} style={{ backgroundColor: shape.color }} />;
    default:
      return null;
  }
}
