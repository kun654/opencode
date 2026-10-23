import path from "node:path"

/** The external trigger requires both diagnostics and a caller-chosen absolute destination. */
export function snapshotDirectory(env: NodeJS.ProcessEnv) {
  const interval = env.OPENCODE_DESKTOP_MEMORY_LOG
  const seconds = Number(interval)

  if (!interval || !/^\d+(\.\d+)?$/.test(interval) || seconds < 1 || seconds > 2_147_483) return undefined
  const directory = env.OPENCODE_DESKTOP_HEAP_DIRECTORY

  return directory && path.isAbsolute(directory) ? directory : undefined
}
