import "dotenv/config";
const fs = require("fs");
const express = require("express");
import { Request, Response, NextFunction } from "express-serve-static-core";
import { DEFAULT_COOKIE_SETTINGS, QUERY_PARAMS, ROUTES } from "./constants";

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
  }
);

function handlePost(request: Request, response: Response, route: string) {
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
    handlePost(request, response, ROUTES.LOGIN)
  );

app
  .route(ROUTES.PAYMENT)
  .post((request: Request, response: Response) =>
    handlePost(request, response, ROUTES.PAYMENT)
  );

app
  .route(ROUTES.IDENTITY)
  .post((request: Request, response: Response) =>
    handlePost(request, response, ROUTES.IDENTITY)
  );

try {
  const cert = fs.readFileSync(
    `${__dirname}/../${process.env.SSL_CERT}`,
    "utf8"
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
