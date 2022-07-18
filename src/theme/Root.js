import React from 'react'

import RootFolderProvider from '@theme/RootFolderProvider'

import '@theme/ShortcutManager'

export default function Root({ children }) {
    return (
        <RootFolderProvider>
            {children}
        </RootFolderProvider>
    )
}
