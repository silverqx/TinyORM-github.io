import { useContext } from 'react'

import RootFolderContext from '@theme/RootFolderContext'

export default function useRootFolderContext() {
    const context = useContext(RootFolderContext)

    if (context != null)
        return context

    throw new Error("useRootFolderContext is used outside of Layout component.")
}
