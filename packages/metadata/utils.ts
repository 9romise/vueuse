import type { VueUseFunction } from './types'

export function getCategories(functions: VueUseFunction[]): string[] {
  return uniq(
    functions
      .filter(i => !i.internal)
      .map(i => i.category)
      .filter(Boolean) as string[],
  ).sort(
    (a, b) => (a.startsWith('@') && !b.startsWith('@'))
      ? 1
      : (b.startsWith('@') && !a.startsWith('@'))
          ? -1
          : a.localeCompare(b),
  )
}

export function uniq<T extends any[]>(a: T): T {
  return Array.from(new Set(a)) as T
}
