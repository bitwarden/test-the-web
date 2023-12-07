// Workaround for current custom data-attribute persistence
// https://github.com/facebook/docusaurus/issues/9554

export default module = {
  onRouteUpdate({ location, previousLocation }) {
    if (location.pathname !== previousLocation?.pathname) {
      // copied from `docusaurus-theme-classic/src/index.ts` and modified
      try {
        // custom attributes
        let attributesToRemove = [
          "data-bare-page",
          "data-hide-header",
          "data-hide-pagination",
          "data-hide-sidebar",
        ];
        const entries = [
          ...new URLSearchParams(window.location.search).entries(),
        ];
        const DataQueryStringPrefixKey = "docusaurus-data-";

        if (entries.length) {
          for (var [searchKey, value] of entries) {
            if (searchKey.startsWith(`${DataQueryStringPrefixKey}`)) {
              var key = searchKey.replace(
                `${DataQueryStringPrefixKey}`,
                "data-",
              );
              document.documentElement.setAttribute(key, value);

              // Don't remove the attribute if it's part of a present query string
              attributesToRemove = attributesToRemove.filter(
                (attributeKey) => attributeKey !== key,
              );
            }
          }
        }

        if (attributesToRemove.length) {
          for (var attributeKey of attributesToRemove) {
            try {
              document.documentElement.attributes.removeNamedItem(attributeKey);
            } catch {}
          }
        }
      } catch (e) {}
    }
  },
};
