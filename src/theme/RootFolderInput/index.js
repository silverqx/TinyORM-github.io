import React from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'

import useRootFolderContext from '@theme/hooks/useRootFolderContext'
import { folderDefaultValue, isApplicationFolder } from '@theme/utils/rootFolderUtils'

import styles from './styles.module.css'

/**
 * Input element to save the Root path and Application folder.
 *
 * Value is saved to the local storage.
 */
function RootFolderInput({ groupId, label }) {
    const { rootFolder, setRootFolder } = useRootFolderContext()
    const isAppFolder = isApplicationFolder(groupId)
    const labelType = isAppFolder ? 'application' : 'root'
    const note = isAppFolder ? `\nThis folder name is common for all shells (eg. pwsh, bash, ...)`
                             : ''

    return (
        <form name="tinyorm-root-folder-form"
            className={clsx(styles.rootFolderInput, styles[groupId], groupId)}
        >
            <input
                name='tinyorm-root-folder-input'
                className={clsx(styles.input, styles[groupId], groupId)}
                placeholder={`Enter ${labelType} folder...`}
                title={`This ${labelType} folder will be used in all ${label} examples at ` +
                    `tinyorm.org${note}`}
                onChange={(event) => {
                    setRootFolder(groupId, event.target.value)
                }}
                value={rootFolder[groupId] ?? folderDefaultValue(groupId)}
            />
        </form>
    )
}

RootFolderInput.propTypes = {
    groupId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default RootFolderInput
