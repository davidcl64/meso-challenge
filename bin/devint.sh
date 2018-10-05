#!/bin/bash

# In order to run this you will need to first run mongo (via docker or other)
# and point the MONGO_DB environment variable at that instance
set -o errexit # Exit on error

npm run lint && \
npm run test && \
npm run test:integration && \
npm run dev:server
