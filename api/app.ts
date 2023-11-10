import "dotenv/config";
const fs = require("fs");
const express = require("express");
import { Request, Response, NextFunction } from "express-serve-static-core";
import { DEFAULT_COOKIE_SETTINGS, QUERY_PARAMS, ROUTES } from "./constants";

const port = process.env.SERVE_PORT || 443;
const insecurePort = process.env.SERVE_INSECURE_PORT || 80;
const sslCertFileName = process.env.SSL_CERT;
const sslKeyFileName = process.env.SSL_KEY;
const staticFilesPath = process.env.STATIC_FILES_DIR || "client/build";

const app = express();

if (staticFilesPath) {
  app.use(express.static(`${__dirname}/../../${process.env.STATIC_FILES_DIR}`));
} else {
  console.warn("The static files folder could not be found.");
}

// for handling form content-types
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: ["application/json"] }));

const helmet = require("helmet");
app.use(helmet());

app.disable("x-powered-by");

// error handler
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response.status(500).send("Something broke!");
  },
);

function handlePost(request: Request, response: Response, route: string) {
  console.log("POST received for:", route);
  const referrerURL = request.get("Referrer") || "";
  let referrerQueryParams = "";

  const isLogin = route === ROUTES.LOGIN;
  const responsePath = `/forms/response/${
    isLogin ? "login-success" : "request-success"
  }`;

  response.cookie("referrerRequestBody", JSON.stringify(request.body), {
    path: responsePath,
    ...DEFAULT_COOKIE_SETTINGS,
  });

  try {
    const url = new URL(referrerURL);
    url.searchParams.append(QUERY_PARAMS.HIDE_PAGINATION, "true");
    url.searchParams.append(QUERY_PARAMS.HIDE_HEADER, "true");
    referrerQueryParams = url.search;
  } catch {}

  // referrer query param passthrough
  response.redirect(`${responsePath}${referrerQueryParams}`);
}

app
  .route(ROUTES.LOGIN)
  .post((request: Request, response: Response) =>
    handlePost(request, response, ROUTES.LOGIN),
  );

app
  .route(ROUTES.PAYMENT)
  .post((request: Request, response: Response) =>
    handlePost(request, response, ROUTES.PAYMENT),
  );

app
  .route(ROUTES.IDENTITY)
  .post((request: Request, response: Response) =>
    handlePost(request, response, ROUTES.IDENTITY),
  );

try {
  const cert = fs.readFileSync(`${__dirname}/../${sslCertFileName}`, "utf8");
  const key = fs.readFileSync(`${__dirname}/../${sslKeyFileName}`, "utf8");

  const https = require("https");
  const credentials = { key, cert };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, () => {
    console.log(`SSL-enabled app server listening on port ${port}`);
  });
} catch {
  console.log("local certs were not found");
}

app.listen(insecurePort, () => {
  console.log(`app server listening on (insecure) port ${insecurePort}`);
});
