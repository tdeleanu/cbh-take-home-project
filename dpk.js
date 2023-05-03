const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;


const stringifyCircular = (obj) => {
  const seen = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  });
};

const hash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  if(!event) return TRIVIAL_PARTITION_KEY;

  let candidate = event?.partitionKey ?? TRIVIAL_PARTITION_KEY;

  if (!event?.partitionKey) {
    const data = stringifyCircular(event);
    candidate = hash(data);
  }

  if (typeof candidate !== "string") {
    candidate = stringifyCircular(candidate);
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH ? hash(candidate) : candidate;
};