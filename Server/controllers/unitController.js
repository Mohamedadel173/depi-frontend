import Unit from "../models/unitModel.js";

export const addUnit = async (req, res) => {
  try {
    const { title, order, levelId } = req.body;

    const unit = new Unit({
      title,
      order,
      levelId,
      isLocked: order !== 1,
    });

    await unit.save();
    res.status(201).json({ message: "Unit created successfully", unit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnitsByLevel = async (req, res) => {
  try {
    const { levelId } = req.params;
    const units = await Unit.find({ levelId }).sort({ order: 1 });
    res.status(200).json({ units });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeUnit = async (req, res) => {
  try {
    const { unitId } = req.params;

    const currentUnit = await Unit.findById(unitId);
    if (!currentUnit)
      return res.status(404).json({ message: "Unit not found" });

    currentUnit.isComplete = true;
    await currentUnit.save();

    const nextUnit = await Unit.findOne({
      levelId: currentUnit.levelId,
      order: currentUnit.order + 1,
    });

    if (nextUnit) {
      nextUnit.isLocked = false;
      await nextUnit.save();
    }

    res.status(200).json({ message: "Unit completed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnitById = async (req, res) => {
  try {
    const { levelId, unitId } = req.params;

    const unit = await Unit.findOne({ _id: unitId, levelId });
    if (!unit)
      return res.status(404).json({ message: "Unit not found for this level" });

    if (unit.isLocked)
      return res.status(403).json({ message: "This unit is locked" });

    res.status(200).json({
      id: unit._id,
      title: unit.title,
      order: unit.order,
      isComplete: unit.isComplete,
      isLocked: unit.isLocked,
      levelId: unit.levelId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};