import type { ShallowRef } from 'vue'
import {
  getCurrentInstance,
  // eslint-disable-next-line no-restricted-imports
  onMounted,
  shallowRef,
} from 'vue'

/**
 * Mounted state in ref.
 *
 * @see https://vueuse.org/useMounted
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useMounted(): ShallowRef<boolean> {
  const isMounted = shallowRef(false)

  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      isMounted.value = true
    }, instance)
  }

  return isMounted
}
