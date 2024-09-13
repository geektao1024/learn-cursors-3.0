'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Github } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { path: '/getting-started', label: 'Next.js 入门', isButton: true },
  { path: '/all-tutorials', label: '视频教程' },
  { path: '/posts', label: '文章' },
  { path: '/docs', label: '中文文档' },
  { path: '/showcase', label: '网站实例' },
  { path: 'https://nextjs.org/', label: '英文官网' },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;
    const checkLoginStatus = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        if (isMounted) setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkLoginStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center justify-between w-full text-center text-neutral-900">
          <Link href="/" className="flex h-14 text-sky-600 mr-8" id="a-1">
            <figure className="cursor-pointer">
              <div className="relative m-auto w-32 h-8" id="div-1">
                <Image
                  src="/logo.png"
                  alt="Next.js Logo"
                  layout="fill"
                  objectFit="contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </figure>
          </Link>
          <nav className="flex-1 flex items-center justify-center space-x-12">
            {navItems.map((item) => (
              item.isButton ? (
                <Link key={item.path} href={item.path}>
                  <Button 
                    className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 border-2 border-blue-600 rounded-lg px-6 py-2 font-medium transition-colors duration-300"
                  >
                    {item.label}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium text-stone-500 hover:text-blue-600 transition-colors duration-300",
                    item.path === pathname && "text-blue-600"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <div className="flex items-center ml-8">
            <Link
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-blue-600 transition-colors duration-300"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            {!isLoading && isLoggedIn && (
              <>
                <Link href="/admin">
                  <Button variant="ghost" className="ml-4">管理</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="ml-4">登出</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}