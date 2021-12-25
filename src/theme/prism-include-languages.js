/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import siteConfig from '@generated/docusaurus.config'

const prismIncludeLanguages = (PrismObject) => {
    if (!ExecutionEnvironment.canUseDOM)
        return

    const { themeConfig: { prism = {} } } = siteConfig
    const { additionalLanguages = [] } = prism

    window.Prism = PrismObject

    // Built-in languages
    additionalLanguages.forEach((lang) => {
        require(`prismjs/components/prism-${lang}`) // eslint-disable-line
    })

    // Syntax highlighters created by me
    const myAdditionalLanguages = ['qmake', 'bash']

    myAdditionalLanguages.forEach((lang) => {
        require(`@site/src/prism-languages/prism-${lang}`)
    })

    delete window.Prism
}

export default prismIncludeLanguages
