import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import RootFolderProvider from '@theme/RootFolderProvider'

import Common from '@theme/Common'
import ShortcutManager from '@theme/ShortcutManager'

if (ExecutionEnvironment.canUseDOM) {
    Common()
    ShortcutManager()
}

export default function Root({ children }) {
    return (
        <RootFolderProvider>
            {children}
        </RootFolderProvider>
    )
}
