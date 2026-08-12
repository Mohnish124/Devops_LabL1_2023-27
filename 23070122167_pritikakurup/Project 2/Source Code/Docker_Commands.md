# Docker Commands Used

## Create React Application

```bash
npx create-react-app react-docker-app
cd react-docker-app
```

## Run React Application

```bash
npm start
```

Application URL:

http://localhost:3000

## Build Development Image

```bash
docker compose build
```

## Run Development Container

```bash
docker compose up
```

## Check Running Containers

```bash
docker ps
```

## Check Docker Images

```bash
docker images
```

## Stop Development Container

```bash
docker compose down
```

## Build Production Image

```bash
docker compose -f docker-compose.prod.yml build
```

## Run Production Container

```bash
docker compose -f docker-compose.prod.yml up
```

Application URL:

http://localhost

## Stop Production Container

```bash
docker compose -f docker-compose.prod.yml down
```