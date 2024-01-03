'use client'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { useState } from 'react'

const MainLayout = ({ children }) => {
    const [sideOpen, setSideOpen] = useState(false)

    const changeSideBar = () => {
        setSideOpen(prev => !prev)
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white pb-4">
            <Sidebar/>

            <div className="flex flex-1 w-full flex-col h-full px-4 overflow-hidden gap-2">
                <Navbar/>

                <div className="flex flex-1 h-full overflow-hidden px-2 pt-2 rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
