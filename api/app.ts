const fs = require("fs");
const express = require("express");
import { Request, Response, NextFunction } from "express-serve-static-core";
import {
  COOKIE_OPTIONS,
  QUERY_PARAMS,
  ROUTES,
  STORED_VALUE_KEYS,
  mockSearchData,
} from "./constants";

import "dotenv/config";
const port = process.env.SERVE_PORT || 443;
const insecurePort = process.env.SERVE_INSECURE_PORT || 80;
const sslCertFileName = process.env.SSL_CERT || "ssl.crt";
const sslKeyFileName = process.env.SSL_KEY || "ssl.key";
const staticFilesPath = process.env.STATIC_FILES_DIR || "client/build";

const app = express();

if (staticFilesPath) {
  app.use(express.static(`${__dirname}/../../${staticFilesPath}`));
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

function handleRequest(
  request: Request,
  response: Response,
  route: string,
  responseBody?: object,
) {
  console.log(`${request.method} received for:`, route);

  if (request.body?.returnType === "json") {
    response.json(responseBody);

    return;
  }

  const referrerURL = request.get("Referrer") || "";
  let referrerQueryParams = "";

  const isLogin = route === ROUTES.LOGIN;

  // @TODO enable fail case
  const responsePath = `/forms/response/${
    isLogin ? "login-success" : "request-success"
  }`;

  const responseCookieOptions = {
    path: responsePath,
    ...COOKIE_OPTIONS,
  };

  response.cookie(
    STORED_VALUE_KEYS.REFERRER_REQUEST_BODY,
    JSON.stringify(request.body),
    responseCookieOptions,
  );

  if (responseBody) {
    response.cookie(
      STORED_VALUE_KEYS.REQUEST_RESPONSE_BODY,
      JSON.stringify(responseBody),
      responseCookieOptions,
    );
  }

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
  .route(ROUTES.ACCOUNT)
  .post((request: Request, response: Response) =>
    handleRequest(request, response, ROUTES.ACCOUNT),
  );

app
  .route(ROUTES.IDENTITY)
  .post((request: Request, response: Response) =>
    handleRequest(request, response, ROUTES.IDENTITY),
  );

app
  .route(ROUTES.LOGIN)
  .post((request: Request, response: Response) =>
    handleRequest(request, response, ROUTES.LOGIN),
  );

app
  .route(ROUTES.PAYMENT)
  .post((request: Request, response: Response) =>
    handleRequest(request, response, ROUTES.PAYMENT),
  );

app
  .route(ROUTES.WELL_KNOWN_CHANGE_PASSWORD)
  .get((request: Request, response: Response) =>
    response.redirect(ROUTES.UPDATE_PASSWORD_FORM),
  );

app.route(ROUTES.SEARCH).post((request: Request, response: Response) => {
  const returnDataStart = ~~(Math.random() * mockSearchData.length);
  const returnDataLength = ~~(
    Math.random() *
    (mockSearchData.length - returnDataStart)
  );

  return handleRequest(request, response, ROUTES.SEARCH, {
    success: true,
    data: mockSearchData.slice(
      returnDataStart,
      returnDataStart + returnDataLength,
    ),
  });
});

try {
  const cert = fs.readFileSync(`${__dirname}/../${sslCertFileName}`, "utf8");
  const key = fs.readFileSync(`${__dirname}/../${sslKeyFileName}`, "utf8");

  const https = require("https");
  const credentials = { key, cert };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, () => {
    console.log(`SSL-enabled app server listening on port ${port}`);
  });
} catch (error) {
  console.log("error: ", error);
  console.log("local certs were not found");
}

app.listen(insecurePort, () => {
  console.log(`app server listening on (insecure) port ${insecurePort}`);
});
