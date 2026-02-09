import { describe, it, expect } from "vitest";
import { NameDenormalizer } from "../src/index";

describe("NameDenormalizer", () => {
  const nd = new NameDenormalizer();

  describe("get", () => {
    it("returns related names for a known name", () => {
      const result = nd.get("greg");
      expect(result).toBeInstanceOf(Set);
      expect(result).toContain("gregory");
    });

    it("is case-insensitive", () => {
      const lower = nd.get("greg");
      const upper = nd.get("Greg");
      const mixed = nd.get("GREG");
      expect(lower).toEqual(upper);
      expect(lower).toEqual(mixed);
    });

    it("does not include the input name in the result", () => {
      const result = nd.get("greg");
      expect(result).not.toContain("greg");
    });

    it("returns undefined for an unknown name", () => {
      expect(nd.get("xyznotaname")).toBeUndefined();
    });

    it("works bidirectionally", () => {
      const fromGreg = nd.get("greg")!;
      expect(fromGreg).toContain("gregory");

      const fromGregory = nd.get("gregory")!;
      expect(fromGregory).toContain("greg");
    });
  });

  describe("lookup", () => {
    it("returns related names for a known name", () => {
      const result = nd.lookup("greg");
      expect(result).toBeInstanceOf(Set);
      expect(result).toContain("gregory");
    });

    it("throws for an unknown name", () => {
      expect(() => nd.lookup("xyznotaname")).toThrow("Name not found");
    });
  });
});
