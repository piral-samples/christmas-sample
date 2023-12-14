#!/bin/bash

npm run build --workspace=christmas-demo-app -- --type release

npx pilet publish --fresh 'packages/*-pilet' --url https://munichjs-christmas-demo.my.piral.cloud/api/v1/pilet --interactive

npx http-server packages/app/dist/release
