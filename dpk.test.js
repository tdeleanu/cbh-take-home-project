const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  test("should return trivial partition key when no event provided", () => {
    const result = deterministicPartitionKey();
    expect(result).toEqual("0");
  });

  test("should return partition key from event if provided", () => {
    const event = { partitionKey: "testKey" };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(7);
  });

  test("should create partition key from event data if no partition key provided", () => {
    const event = { someData: "value" };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });

  test("should handle non-string partition keys", () => {
    const event = { partitionKey: 12345 };
    const result = deterministicPartitionKey(event);
    expect(result).toEqual("12345");
  });

  test("should handle null partition keys", () => {
    const event = { partitionKey: null };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });

  test("should handle undefined partition keys", () => {
    const event = { partitionKey: undefined };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });

  test("should hash long partition keys", () => {
    const longKey = "a".repeat(257);
    const event = { partitionKey: longKey };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });

  test("should return distinct partition keys for different events", () => {
    const event1 = { someData: "value1" };
    const event2 = { someData: "value2" };
    const result1 = deterministicPartitionKey(event1);
    const result2 = deterministicPartitionKey(event2);
    expect(result1).not.toEqual(result2);
  });

  test("should return consistent partition keys for the same event", () => {
    const event = { someData: "value" };
    const result1 = deterministicPartitionKey(event);
    const result2 = deterministicPartitionKey(event);
    expect(result1).toEqual(result2);
  });

  test("should handle large events", () => {
    const largeData = "x".repeat(10000);
    const event = { largeData };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });

  test("should handle complex events", () => {
    const complexEvent = {
      data: {
        nestedData: {
          value1: "test",
          value2: [1, 2, 3],
          value3: { key: "value" },
        },
      },
    };
    const result = deterministicPartitionKey(complexEvent);
    expect(result).toHaveLength(128);
  });
  test("should handle empty event object", () => {
    const event = {};
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
  test("should handle nested empty objects in event", () => {
    const event = { data: { nestedData: {} } };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
  test("should handle non-object values for event", () => {
    const event = "some string";
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
  test("should handle circular references in event objects", () => {
    const event = { data: { nestedData: {} } };
    event.data.nestedData.circularRef = event;
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
  test("should handle invalid UTF-8 characters in event object", () => {
    const event = { data: "value\uD800" }; // Invalid UTF-8 character
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
  test("should handle very large event objects", () => {
    const largeData = "x".repeat(1000000);
    const event = { largeData };
    const result = deterministicPartitionKey(event);
    expect(result).toHaveLength(128);
  });
});
