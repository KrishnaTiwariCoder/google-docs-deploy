import schema from "./schema.js";

export const getDocuent = async (docId) => {
  if (!docId) return;
  let doc = await schema.findOne({ id: docId });

  if (doc) return doc;

  return await schema.create({
    data: "",
    id: docId,
  });
};

export const updateDocument = async (id, data) => {
  return await schema.findOneAndUpdate({ id }, { data });
};
