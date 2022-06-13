#!/usr/bin/env pwsh

Set-StrictMode -Version 3.0

# Initialize docsearch-scraper environment if it's not already there
if ((Test-Path .\dotenv.ps1) -and -not (Test-Path env:CONFIG) -and
    -not (Test-Path env:APPLICATION_ID) -and -not (Test-Path env:API_KEY)
) {
    . .\dotenv.ps1
}

docker run --rm -it -e APPLICATION_ID -e API_KEY -e CONFIG @args algolia/docsearch-scraper
