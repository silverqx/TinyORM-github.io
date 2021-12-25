import React from 'react'
import PropTypes from 'prop-types'

import useRootFolderContext from '@theme/hooks/useRootFolderContext'

/**
 * Show the Root path or Application folder.
 *
 * Value is obtained from the local storage by `groupId`.
 */
function RootFolder({ groupId }) {
    const { rootFolder } = useRootFolderContext()

    return <span>{rootFolder[groupId]}</span>
}

RootFolder.propTypes = {
    groupId: PropTypes.string.isRequired,
}

export default RootFolder
