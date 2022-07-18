import React from 'react'

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import RootFolderProvider from '@theme/RootFolderProvider'

import ShortcutManager from '@theme/ShortcutManager'

if (ExecutionEnvironment.canUseDOM)
    ShortcutManager()

export default function Root({ children }) {
    return (
        <RootFolderProvider>
            {children}
        </RootFolderProvider>
    )
}
