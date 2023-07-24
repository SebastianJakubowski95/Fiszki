import mongoose from "mongoose";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/fiszkiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const wordSchema = new mongoose.Schema({
  wordId: Number,
  polish: String,
  english: String,
});

const listSchema = new mongoose.Schema({
  listId: Number,
  listTitle: String,
  isListChecked: Boolean,
  wordsList: [wordSchema],
});

const List = mongoose.model("List", listSchema);
const Word = mongoose.model("Word", wordSchema);

const list = new List({
  listId: Math.random(),
  listTitle: "newListName",
  isListChecked: false,
  wordsList: [],
});

// list.save((err) => {
//   if (err) return console.error(err);
//   console.log("Document saved successfully");
// });
