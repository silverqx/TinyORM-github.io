import useRootFolderContext from '@theme/hooks/useRootFolderContext'

import useIsBrowser from '@docusaurus/useIsBrowser'

import {
    application, application_default,
    bash, bash_default,
    pwsh, pwsh_default
} from '@theme/constants'

// First folder path defined using an input in the Folders Structure component
export const rootFolderPath = (groupId, uniformPath = true) =>
    sanitizePath(
        useRootFolderContext().rootFolder[groupId] ?? folderDefaultValue(groupId),
        groupId,
        uniformPath
    )

// Application folder name only (without path)
export const applicationFolder = () =>
    useRootFolderContext().rootFolder[application] ?? folderDefaultValue(application)

// Second folder path defined using an input in the Folders Structure component
export const applicationFolderPath = (groupId, uniformPath = true) => {
    if (groupId == null)
        throw new Error("The groupId in the applicationFolderPath() can not be empty.")

    const folderSeparator = !uniformPath && groupId === pwsh ? '\\' : '/'

    return sanitizePath(
        rootFolderPath(groupId) + folderSeparator + applicationFolder(),
        groupId,
        uniformPath
    )
}

export function folderDefaultValue(groupId) {
    if (groupId == null)
        throw new Error("The groupId in the folderDefaultValue() can not be empty.")

    // Always empty string for SSR
    const isBrowser = useIsBrowser()
    if (!isBrowser)
        return ''

    switch (groupId) {
        case pwsh:
            return pwsh_default
        case bash:
            return bash_default
        case application:
            return application_default
        default:
            throw new Error(
                `No default value for '${groupId}' groupId in the folderDefaultValue().`)
    }
}

export function isApplicationFolder(groupId) {
    return groupId === application
}

/**
 * Convert bash/powershell environment variable to CMake environment variable in the path.
 *
 * For the pwsh also replace all \ with / excluding '\ '.
 *
 * pwsh - $env:USERPROFILE/Code/c -> $ENV{USERPROFILE}/Code/c
 * bash - $HOME/Code/c -> $ENV{HOME}/Code/c
 */
export function convertToCmakeEnvVariable(shell, path) {
    if (path == null || path === '')
        return path

    const replacer = '$ENV{$1}$2'

    switch (shell) {
        case pwsh:
            // Replace all \ with /, excluding '\ '
            return toUniformPath(path)
                .replace(/\$env:(.+?)(\/.*)/, replacer)
        case bash:
            return path.replace(/\$(.+?)(\/.*)/, replacer)
        default:
            throw new Error(
                `Unsupported shell type '${shell}' in the convertToCmakeEnvVariable().`)
    }
}

function sanitizePath(path, groupId, uniformPath = true) {
    if (path == null || path === '')
        return path

    if (groupId !== pwsh)
        return trimSlash(path)

    const trimmedPath = trimSlash(path)

    if (uniformPath)
        return toUniformPath(trimmedPath)

    return toNativePath(trimmedPath)
}

function trimSlash(path) {
    if (path == null || path === '')
        return path

    return path.replace(/[/\\]+$/, '')
}

function toUniformPath(path) {
    if (path == null || path === '')
        return path

    return path.replaceAll(/\\+(?! )/g, '/')
}

function toNativePath(path) {
    if (path == null || path === '')
        return path

    return path.replaceAll(/\/+/g, '\\')
}
