# Starts Elasticsearch, the Go backend and the React frontend.
$root = $PSScriptRoot

Write-Host "Starting Elasticsearch..."
docker compose -f "$root\social-ai-backend\docker-compose.yml" up -d

Write-Host "Waiting for Elasticsearch to be ready..."
$ready = $false
for ($i = 0; $i -lt 60; $i++) {
    $code = curl.exe -s -o NUL -w "%{http_code}" -u elastic:welcome http://localhost:9200
    if ($code -eq "200") { $ready = $true; break }
    Start-Sleep -Seconds 2
}
if (-not $ready) {
    Write-Host "Elasticsearch did not start. Is Docker Desktop running?"
    exit 1
}
Write-Host "Elasticsearch is ready."

Write-Host "Starting backend and frontend in new windows..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', "cd '$root\social-ai-backend'; go run main.go"
Start-Process powershell -ArgumentList '-NoExit', '-Command', "cd '$root\social-ai-frontend'; npm start"
