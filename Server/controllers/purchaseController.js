import Purchase from "../models/purchaseModel.js";

export const getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.find({ userId }).populate("levelId");

    if (!purchases.length)
      return res.status(404).json({ message: "No purchases found" });

    res.status(200).json({ purchases });
  } catch (error) {
    console.error("Error fetching purchases:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsersPurchases = async (req, res) => {
  try{
    const purchases = await Purchase.find({});
    res.status(200).json({ purchases });
  } catch (error) {
    console.error("Error fetching purchases:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}