#!/bin/bash
npm install --no-audit --no-fund
export NODE_OPTIONS=--openssl-legacy-provider
npm run build 