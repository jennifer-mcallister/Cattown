const Savefile = require("../models/Savefile");

exports.loadSavefile = async (req, res, next) => {
  try {
    const { savefileId } = req.params;
    const savefile = await Savefile.findOne({ _id: savefileId });

    return res.json(savefile);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
};

exports.saveSavefile = async (req, res, next) => {
  try {
    const { savefileId, stats, gold, uniqueItems, relics, cats } = req.body;

    await Savefile.findOneAndUpdate(
      { _id: savefileId },
      {
        stats: stats,
        gold: gold,
        uniqueItems: uniqueItems,
        relics: relics,
        cats: cats,
      }
    );

    const newSave = await Savefile.findOne({ _id: savefileId });

    return res.status(200).json(newSave);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
