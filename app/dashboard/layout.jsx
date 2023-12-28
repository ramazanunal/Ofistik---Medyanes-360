'use client'
import Navbar from '@/containers/App/_components/Navbar'
import Sidebar from '@/containers/App/_components/Sidebar'
import React, { useState } from 'react'

const MainLayout = ({ children }) => {
    const [sideOpen, setSideOpen] = useState(false)

    const changeSideBar = () => {
        setSideOpen(prev => !prev)
    }

    return (
        <div className="flex h-screen overflow-hidden background">
            <Sidebar/>

            <div className="flex flex-1 flex-col h-full">
                <Navbar changeOpen={changeSideBar}/>

                <div className="flex flex-1 h-full overflow-y-scroll pb-24 bg-gray-200 p-2 bg-fuchsia-50 mr-5 rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
