#!/bin/bash

npm run build --workspace=christmas-demo-app -- --type emulator-website
npx http-server packages/app/dist/emulator
