#!/bin/bash

npm run build --workspace=christmas-demo-app -- --type release
npx pilet build 'packages/*-pilet' --type manifest
mv packages/app/dist/release/* dist/

npx http-server dist
