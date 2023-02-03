import React, { useState } from 'react'

export default function ConfigurationSettings() {
    const [checkedFullConfig, setCheckedFullConfig] = useState(false)
    const [checkedEnvPrefix, setCheckedEnvPrefix] = useState(false)

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

function toggleFullConfig(value) {
    const tabs = getTabsContainerList()
    const showFull = value = !value

    if (showFull) {
        tabs[0].style.display = 'none'
        tabs[1].style.display = 'block'
    }
    // Show basic configuration
    else {
        tabs[0].style.display = 'block'
        tabs[1].style.display = 'none'
    }

    return value
}

let tabsCache = null

function getTabsContainerList() {
    if (tabsCache)
        return tabsCache

    return tabsCache = document.getElementById('tinyorm-configuration')
                               .querySelectorAll('.tabs-container')
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
    const addEnvPrefix = value = !value

    prismTokensMap.forEach((tokens, index) => {
        tokens.forEach((token) => {
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

    return value
}

let prismTokensMapCache = null

function getPrismTokensMap() {
    if (prismTokensMapCache)
        return prismTokensMapCache

    const prismCodesList = document.getElementById('tinyorm-configuration')
                                   .querySelectorAll('.prism-code > code')

    // Pre-allocate a new array
    prismTokensMapCache = new Array(prismCodesList.length)

    prismCodesList.forEach((codeElement, index) => {
        // Filter all prism tokens (span elements) whose content starts with the "DB_ string
        prismTokensMapCache[index] =
            Array.from(codeElement.querySelectorAll('.token.string'))
            .filter((token) => token.textContent.startsWith(DbPrefix));
    })

    return prismTokensMapCache
}
