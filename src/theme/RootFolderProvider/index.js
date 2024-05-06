import { useMemo } from 'react'

import RootFolderContext from '@theme/RootFolderContext'
import useRootFolder from '@theme/hooks/useRootFolder'

export default function RootFolderProvider(props) {
    const { rootFolder, setRootFolder } = useRootFolder()

    const contextValue = useMemo(
        () => ({ rootFolder, setRootFolder }),
        [rootFolder, setRootFolder]
    )

    return (
        <RootFolderContext.Provider value={contextValue}>
            {props.children}
        </RootFolderContext.Provider>
    )
}
