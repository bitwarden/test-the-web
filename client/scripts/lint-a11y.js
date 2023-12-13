const { exec } = require("child_process");

async function getPagesFromSitemap(url = "https://localhost/sitemap.xml") {
  let response;

  try {
    response = await fetch(url);
  } catch (e) {
    console.error(e);
    console.warn(
      "Could not load the resource; are you sure the resource is being served?",
    );

    return;
  }

  const xml = await response.text();
  const parsedURLs = Array.from(xml.split(/<loc>/gi)).reduce((acc, str) => {
    if (!str.startsWith("http")) {
      return acc;
    }

    return [...acc, str.replace(/<\/loc>.*/gi, "")];
  }, []);

  return parsedURLs;
}

(async () => {
  const parsedURLs = (await getPagesFromSitemap()) || [];

  console.log(`Checking ${parsedURLs.length} found site URLs...`);

  const commandArgumentString = parsedURLs.join(" ");

  await exec(
    `axe -q --save axe-a11y-report.json ${commandArgumentString}`,
    (error, stdout, stderr) => {
      console.log(stdout);

      if (stderr) {
        console.log(stderr);
      }

      if (error !== null) {
      }
    },
  );
})();
