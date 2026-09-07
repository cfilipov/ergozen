import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const experimentRoot = dirname(fileURLToPath(import.meta.url));
const apiSource = readFileSync(join(experimentRoot, "api.js"), "utf8");

describe("extension subscript security", () => {
  it("opts extension-owned privileged script loads into unsafe URL support", () => {
    expect(apiSource).toContain("function loadExtensionSubScript(path, target)");
    expect(apiSource).toMatch(/loadSubScriptWithOptions\([\s\S]*?allowUnsafeURL:\s*true/);
    expect(apiSource).not.toMatch(/Services\.scriptloader\.loadSubScript\(/);
  });
});
