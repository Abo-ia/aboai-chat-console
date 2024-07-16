import React from 'react'
import SidebarIcons from './SidebarIcons'
import ChatHistory from './ChatHistory'

interface SidebarProps {
    isSidebarOpen: boolean
}

const Sidebar: React.FC <SidebarProps> = (props) => {
    const { isSidebarOpen } = props

    if (!isSidebarOpen) {
        return null
    }

    return (
        <React.Fragment>
            <SidebarIcons />
            <ChatHistory />
        </React.Fragment>
    )
}

export default Sidebar