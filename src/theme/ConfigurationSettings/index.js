import React, { useState } from 'react'
import { useEffect } from 'react'

let tabsCache = null
let prismTokensMapCache = null

export default function ConfigurationSettings() {
    const [checkedFullConfig, setCheckedFullConfig] = useState(false)
    const [checkedEnvPrefix, setCheckedEnvPrefix] = useState(false)

    useEffect(() => {
        clearCaches()

        return () => {
            clearCaches()
        }
    }, [])

    return (
        <form>
            <div className='tinyorm-configuration-row'>
                <label htmlFor='tinyorm-toggle-full'>Full configuration</label>
                <input
                    id='tinyorm-toggle-full'
                    type='checkbox'
                    checked={checkedFullConfig}
                    onChange={() => setCheckedFullConfig(toggleFullConfig)}
                    title='Show full configuration example' />
            </div>

            <div className='tinyorm-configuration-row'>
                <label htmlFor='tinyorm-toggle-prefix'>Prefix environment</label>
                <input
                    id='tinyorm-toggle-prefix'
                    type='checkbox'
                    checked={checkedEnvPrefix}
                    onChange={() => setCheckedEnvPrefix(toggleEnvPrefix)}
                    title='Prefix all environment variables by the database type' />
            </div>
        </form>
    )
}

function clearCaches() {
    tabsCache = null
    prismTokensMapCache = null
}

function toggleFullConfig(value) {
    const tabs = getTabsContainerList()
    const showFull = !value

    // No .tabs-container found, so don't toggle and return the same value
    if (!tabs)
        return value

    // Must find 2 .tabs-container-s
    if (tabs.length !== 2)
        throw new Error('Wrong number of .tabs-container (!== 2) found in the toggle ' +
            `configuration feature, found ${tabs.length}.`)

    if (showFull) {
        tabs[0].style.display = 'none'
        tabs[1].style.display = 'block'
    }
    // Show basic configuration
    else {
        tabs[0].style.display = 'block'
        tabs[1].style.display = 'none'
    }

    // Toggle
    return !value
}

function getTabsContainerList() {
    if (tabsCache)
        return tabsCache

    return tabsCache = document.getElementById('tinyorm-configuration')
                              ?.querySelectorAll('.tabs-container')
}

const DbPrefix = '"DB_'

const MYSQL = 'MYSQL'
const PGSQL = 'PGSQL'
const SQLITE = 'SQLITE'
const prefixMap = [
    MYSQL, PGSQL, SQLITE,
    MYSQL, PGSQL, SQLITE,
]

function toggleEnvPrefix(value) {
    const prismTokensMap = getPrismTokensMap()
    const addEnvPrefix = !value

    // No prism tokens found, so don't toggle and return the same value
    if (!prismTokensMap)
        return value

    prismTokensMap.forEach((tokens, index) => {
        tokens.forEach(token => {
            const tokenContent = token.textContent;
            const prefix = `${DbPrefix}${prefixMap[index]}_`

            if (addEnvPrefix)
                token.textContent = `${prefix}${tokenContent.substring(4)}`

            // Remove environment prefix
            else {
                if (tokenContent.startsWith(prefix))
                    token.textContent = `${DbPrefix}${tokenContent.substring(prefix.length)}`
                else
                    throw new Error(`Token doesn't start with the '${prefix}' prefix.`)
            }
        })
    })

    // Toggle
    return !value
}

function getPrismTokensMap() {
    if (prismTokensMapCache)
        return prismTokensMapCache

    const prismCodesList = document.getElementById('tinyorm-configuration1')
                                  ?.querySelectorAll('.prism-code > code')

    // No prism tokens found
    if (!prismCodesList)
        return prismCodesList

    // Must find 6 configuration examples
    if (prismCodesList.length !== 6)
        throw new Error('Wrong number of .prism-code > code (!== 6) found in the prefix env. ' +
            `feature, found ${prismCodesList.length}.`)

    // Pre-allocate a new array
    prismTokensMapCache = new Array(prismCodesList.length)

    prismCodesList.forEach((codeElement, index) => {
        // Filter all prism tokens (span elements) whose content starts with the "DB_ string
        prismTokensMapCache[index] =
            Array.from(codeElement.querySelectorAll('.token.string'))
            .filter(token => token?.textContent.startsWith(DbPrefix));
    })

    return prismTokensMapCache
}
