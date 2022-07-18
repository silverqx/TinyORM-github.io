import React from 'react'
import PropTypes from 'prop-types'

import { applicationFolderPath } from '@theme/utils/rootFolderUtils'

/**
 * Show the Root path or Application folder.
 *
 * Value is obtained from the local storage by `groupId`.
 */
function RootFolder({ groupId }) {
    return <span>{applicationFolderPath(groupId)}</span>
}

RootFolder.propTypes = {
    groupId: PropTypes.string.isRequired,
}

export default RootFolder
