import { onMounted, onServerPrefetch, ref } from 'vue'

// hydration 状态管理
export function useHydration() {
  const isHydrated = ref(false)
  const isServer = typeof window === 'undefined'

  if (!isServer) {
    onMounted(() => {
      isHydrated.value = true
    })
  }

  return {
    isHydrated,
    isServer,
  }
}

// 客户端专用功能包装器
export function withClientOnly<T>(fn: () => T): T | null {
  if (typeof window !== 'undefined') {
    return fn()
  }
  return null
}

// SSR 安全的异步数据加载
export function useAsyncData<T>(fetchFn: () => Promise<T>, defaultValue: T) {
  const data = ref<T>(defaultValue)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  const load = async () => {
    try {
      loading.value = true
      data.value = await fetchFn()
    }
    catch (e) {
      error.value = e as Error
      console.error('数据加载失败:', e)
    }
    finally {
      loading.value = false
    }
  }

  if (typeof window !== 'undefined') {
    onMounted(load)
  }
  else {
    onServerPrefetch(load)
  }

  return {
    data,
    error,
    loading,
    reload: load,
  }
}

// DOM 可用性检查
export function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector)!)
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect()
        resolve(document.querySelector(selector)!)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
