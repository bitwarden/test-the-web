export default module = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (previousLocation && location.pathname !== previousLocation.pathname) {
      const documentArticle = document.querySelector("body article");
      const scriptsToReload = documentArticle.querySelectorAll("script");

      scriptsToReload.forEach(async (script) => {
        let newScript = document.createElement("script");

        [...script.attributes].forEach(({ nodeName, nodeValue }) => {
          newScript.setAttribute(nodeName, nodeValue);
        });

        await script.remove();
        await documentArticle.appendChild(newScript);
      });
    }
  },
};
