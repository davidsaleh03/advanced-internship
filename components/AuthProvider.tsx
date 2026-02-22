'use client'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthStateChanged, User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '@/redux/firebase/firebase'

const AuthProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const status = onAuthStateChanged(auth, (user: User | null) => {
        if (user && pathname === '/') {
            router.push('/dashboard/for-you')
        }
    })
    return () => status()
  },[router, pathname])
  return <>{children}</>
}

export default AuthProvider