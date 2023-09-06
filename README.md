# Server API

## Server docker

`
cd server
`
### run docker
`
docker compose build
`
### run rake db
`
docker compose run web rake db:create
`

### and run server
`
docker compose up
`

### run db migrate
`
docker compose run web rails db:migrate
`
# Frontend

`
cd frontend
`

`
npm install && npm run dev
`