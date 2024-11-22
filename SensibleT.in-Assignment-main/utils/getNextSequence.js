import Counter from '../models/Counter.js';

export const getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true } // If not found, it creates the document
  );

  return counter.sequence_value;
};
