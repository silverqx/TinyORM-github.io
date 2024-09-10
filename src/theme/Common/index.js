let algoliaSearchInterval = null
let algoliaSearchCounter = 0

/**
 * Set the title attribute on the Algolia Search button.
 */
function setTitleOnAlgoliaSearch() {
    const algoliaBtn = document.querySelector('.DocSearch-Button')

    // Stop trying after ~5 seconds (100ms * 50 = 5000ms)
    if (algoliaSearchCounter > 50)
        clearInterval(algoliaSearchInterval)

    // Nothing to do
    if (algoliaBtn === null) {
        ++algoliaSearchCounter
        return
    }

    algoliaBtn.setAttribute('title', 'Alternative shortcut /')
    clearInterval(algoliaSearchInterval)
}

export default function Common() {
    ready(() => {
        algoliaSearchInterval = setInterval(() => setTitleOnAlgoliaSearch(), 100);
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
