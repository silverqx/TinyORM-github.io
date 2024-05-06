Prism.languages.qmake = {
    'comment': /#.*/,
    'variable': /(?:(?:^|\s)[a-z_A-Z]\w+(?=\s*(?:=|\+=|-=|\*=|~=))\b|\${2}[a-z_A-Z]\w+\b(?!\()|\${2}{[a-z_A-Z]\w+}|\b(?:QT|TEMPLATE|CONFIG|DEFINES|SOURCES|HEADERS|INCLUDEPATH|LIBS|QMAKE_CXXFLAGS)\b)/,
    'boolean': /\b(?:true|false)\b/,
    'operator': /(=|\+=|-=|\*=|~=)/,
    'number': /\b\d+(?:\.\d+)*\b/,
    'function': /(?:\b[a-z_]\w*(?=\s*\()\b|\${2}[a-z_]\w+(?=\s*\()\b)/i,
}
