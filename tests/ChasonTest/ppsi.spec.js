run_spec(__dirname, ["typescript"], {
    importOrder: [
        // react at the top, when present
        "^react$",
        // catch all
        "<THIRD_PARTY_MODULES>",
        // our packages, but not likely components
        "^@th/(?!react-app/src).*$",
        // probably not any components, therefore group them here
        "store|lib|data",
        "<SEPARATOR>",

        // react-app/src (probably components)
        "^@th/.*$",
        // with component in the path, it is almost certainly a component
        "components",
        // internal to the current package (because they are relative), but not imports declaring an extension
        "^\\.((?!\\.[a-z]{2,4}).?)*$",
        "<SEPARATOR>",

        // files
        ".*\\.[a-z]{2,4}$",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ['typescript']
});
