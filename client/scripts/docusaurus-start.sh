#!/usr/bin/env bash

ROOT_DIR=$(git rev-parse --show-toplevel)

# shellcheck source=.env
set -o allexport
HTTPS=true

# Generate via ./scripts/generate-certs, or mkcert
# (see: https://docusaurus.io/docs/cli#enabling-https)
source $ROOT_DIR/api/.env
SSL_CRT_FILE=$ROOT_DIR/api/$SSL_CERT
SSL_KEY_FILE=$ROOT_DIR/api/$SSL_KEY
set +o allexport

npm run docusaurus start
