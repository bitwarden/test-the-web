import "dotenv/config";
const fs = require("fs");
const express = require("express");
import { Request, Response, NextFunction } from "express-serve-static-core";

const app = express();

app.use(express.static(process.env.STATIC_FILES_DIR));

// for handling form content-types
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: ["application/json"] }));

const helmet = require("helmet");
app.use(helmet());

app.disable("x-powered-by");

const port = process.env.SERVE_PORT;

// error handler
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response.status(500).send("Something broke!");
  },
);

app.route("/login").post((request: Request, response: Response) => {
  const referrerURL = request.get("Referrer") || "";
  let referrerQueryParams = "";

  response.cookie("referrerRequestBody", JSON.stringify(request.body), {
    path: "/forms/success/login-success",
    sameSite: true,
    secure: true,
    maxAge: 1000 * 60 * 5,
  });

  try {
    const url = new URL(referrerURL);
    url.searchParams.append("docusaurus-data-hide-pagination", "true");
    url.searchParams.append("docusaurus-data-hide-header", "true");
    referrerQueryParams = url.search;
  } catch {}

  // referrer query param passthrough
  response.redirect(`/forms/success/login-success${referrerQueryParams}`);
});

try {
  const cert = fs.readFileSync(
    `${__dirname}/../${process.env.SSL_CERT}`,
    "utf8",
  );
  const key = fs.readFileSync(`${__dirname}/../${process.env.SSL_KEY}`, "utf8");

  const https = require("https");
  const credentials = { key, cert };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, () => {
    console.log(`SSL-enabled app server listening on port ${port}`);
  });
} catch {
  app.listen(port, () => {
    console.log(`app server listening on port ${port}`);
  });
}
