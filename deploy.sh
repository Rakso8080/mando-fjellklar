#!/bin/bash
# M&O — Auto-deploy til Netlify
# Bruk:  ./deploy.sh "din commit melding"
# eller: npm run deploy "din melding"

MSG="${1:-Auto-oppdatering}"
git add .
git commit -m "$MSG"
netlify deploy --prod --dir=.
