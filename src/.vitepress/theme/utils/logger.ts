// 日志工具类
const isDev = import.meta.env.DEV

export const logger = {
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args)
    }
  },
  error: (...args: any[]) => {
    if (isDev) {
      console.error(...args)
    }
  },
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args)
    }
  },
}
