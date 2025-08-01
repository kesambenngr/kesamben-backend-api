/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/
use("desa-app");

// Step 1: Group penduduks by nokk and categorize them into kepalaKeluarga and anggota
const pipeline = [
  {
    $group: {
      _id: "$nokk",
      kepalaKeluarga: {
        $addToSet: {
          $cond: [{ $eq: ["$shdk", "Kepala Keluarga"] }, "$_id", null],
        },
      },
      anggota: {
        $addToSet: {
          $cond: [{ $ne: ["$shdk", "Kepala Keluarga"] }, "$_id", null],
        },
      },
    },
  },
  {
    $project: {
      kepalaKeluarga: {
        $filter: {
          input: "$kepalaKeluarga",
          as: "id",
          cond: { $ne: ["$id", null] },
        },
      },
      anggota: {
        $filter: {
          input: "$anggota",
          as: "id",
          cond: { $ne: ["$id", null] },
        },
      },
    },
  },
];

// Step 2: Iterate over the grouped results and update the keluargas collection
db.getCollection("penduduks")
  .aggregate(pipeline)
  .forEach((group) => {
    db.getCollection("keluargas").updateOne(
      { nokk: group._id },
      {
        $addToSet: {
          kepalaKeluarga: { $each: group.kepalaKeluarga },
          anggota: { $each: group.anggota },
        },
      },
      { upsert: true }
    );
  });
