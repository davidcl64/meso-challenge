#!/bin/bash
 
set -o errexit # Exit on error

npm run lint && \
npm run test && \
npm run dev:server 
