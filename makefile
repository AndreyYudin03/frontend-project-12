lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npm start

deploy:
	git push heroku main

start:
	make build
	make start-backend


develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build