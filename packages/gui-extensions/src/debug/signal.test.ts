import { expect, test } from "bun:test"
import path from "node:path"
import { snapshotDirectory } from "./signal"

test.each([
  [undefined, undefined, false],
  [undefined, path.resolve("heaps"), false],
  ["60", undefined, false],
  ["60", "relative", false],
  ["60", "", false],
  ["0", path.resolve("heaps"), false],
  ["Infinity", path.resolve("heaps"), false],
  ["0.5", path.resolve("heaps"), false],
  ["2147484", path.resolve("heaps"), false],
  ["60", path.resolve("heaps"), true],
] as const)("external snapshots require valid diagnostics=%s and destination=%s", (interval, directory, enabled) => {
  expect(snapshotDirectory({ OPENCODE_DESKTOP_MEMORY_LOG: interval, OPENCODE_DESKTOP_HEAP_DIRECTORY: directory })).toBe(
    enabled ? directory : undefined,
  )
})
