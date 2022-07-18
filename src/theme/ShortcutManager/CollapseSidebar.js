// Nice hacky way like old days, no React and Swizzling

let titleInterval
let titleCounter = 0
let titleExpandInterval
let btn

/**
 * Add the (q) to the title of the Expand sidebar button.
 */
function setExpandTitle() {
    const btnExpand = document.querySelector(
        '.theme-doc-sidebar-container div[title="Expand sidebar"]')

    if (!btnExpand)
        return

    btnExpand.title += ' (q)'

    clearTimeout(titleExpandInterval)
}

/**
 * Add the (q) to the title of the Collapse sidebar button.
 */
function setTitle() {
    btn = document.querySelector('.theme-doc-sidebar-container > div > button')

    // Try only for 1500ms
    if (titleCounter >= 50) {
        clearInterval(titleInterval)
        return
    }

    if (!btn) {
        ++titleCounter
        return
    }

    btn.title += ' (q)'

    clearInterval(titleInterval)

    // Expand sidebar button has 200ms transition, so 300ms is enough
    btn.addEventListener('click', () => {
        titleExpandInterval = setTimeout(setExpandTitle, 300)
    })
}

/**
 * Main keyboard event handler.
 *
 * @param {KeyboardEvent} ev
 */
function main(ev) {
    // Skip editable elements
    if (ev.target.isContentEditable || ev.target.nodeName === 'INPUT' ||
        ev.target.nodeName === 'TEXTAREA' || ev.target.nodeName === 'SELECT')
        return

    if (ev.code !== 'KeyQ')
        return

    btn.click()

    titleExpandInterval = setTimeout(setExpandTitle, 300)
}

// Fire it up 🕺
export default function CollapseSidebar() {
    ready(() => {
        titleInterval = setInterval(setTitle, 30)

        document.addEventListener('keyup', main)
    })
}

/**
 * Specify a function to execute when the DOM is fully loaded.
 */
function ready(fn) {
    if (document.readyState !== 'loading')
        fn()
    else
        document.addEventListener('DOMContentLoaded', fn)
}
