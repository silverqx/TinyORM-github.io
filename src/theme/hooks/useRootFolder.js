import { useCallback, useEffect, useState } from 'react'

import { createStorageSlot, listStorageKeys } from '@docusaurus/theme-common'

const root_folder_prefix = 'tinyorm.rootFolder.'

const useRootFolder = () => {
    const [rootFolder, setRootFolder] = useState({})

    const setRootFolderSyncWithLocalStorage = useCallback((groupId, value) => {
        createStorageSlot(`${root_folder_prefix}${groupId}`).set(value)
    }, [])

    useEffect(() => {
        try {
            const localStorageValues = {}

            listStorageKeys().forEach((storageKey) => {
                if (storageKey.startsWith(root_folder_prefix)) {
                    const groupId = storageKey.substring(root_folder_prefix.length)
                    localStorageValues[groupId] = createStorageSlot(storageKey).get()
                }
            })

            setRootFolder(localStorageValues)
        } catch (err) {
            console.error(err)
        }
    }, [])

    return {
        rootFolder,
        setRootFolder: (groupId, value) => {
            setRootFolder((oldValues) => ({ ...oldValues, [groupId]: value }))
            setRootFolderSyncWithLocalStorage(groupId, value)
        },
    }
}

export default useRootFolder
