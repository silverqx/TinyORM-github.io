import React from 'react'

import RootFolderProvider from '@theme/RootFolderProvider'

export default function Root({ children }) {
    return (
        <RootFolderProvider>
            {children}
        </RootFolderProvider>
    )
}
