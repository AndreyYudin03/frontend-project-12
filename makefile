lint-frontend:
	make -C frontend lint

install:
	npm ci
	make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	PORT=5000 npx start-server -s ./frontend/build

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build
