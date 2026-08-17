export interface SnapshotLike {
  val: () => unknown
}

export function snapshotValue<T>(snapshot: SnapshotLike): T {
  const value: unknown = snapshot.val()
  return value as T
}

export function snapshotCollection<T>(snapshot: SnapshotLike): T[] {
  const value: unknown = snapshot.val()

  if (value === null || typeof value !== 'object') {
    return []
  }

  return Object.values(value as Record<string, T>)
}

