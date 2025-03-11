import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from '../context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
        <Header/>
        <Outlet/>
    </AuthContextProvider>
    </QueryClientProvider>
  )
}
