# Docusaurus 2
# deploy to gh-pages
$Env:GIT_USER           = ""
$Env:USE_SSH            = "true"
$Env:DEPLOYMENT_BRANCH  = "gh-pages"
$Env:CURRENT_BRANCH     = "main"

# Algolia index rebuild by DocSearch docker container
$Env:APPLICATION_ID = ""
$Env:API_KEY        = ""
$Env:CONFIG         = $(Get-Content .\docusaurus-2_algolia.json | jq -r tostring)
