// 日志工具类
const isDev = import.meta.env.DEV

interface Logger {
  log: (...args: any[]) => void
  error: (...args: any[]) => void
  warn: (...args: any[]) => void
  debug: (...args: any[]) => void
}

export const logger: Logger = {
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
  debug: (...args: any[]) => {
    if (isDev) {
      console.debug(...args)
    }
  },
}
