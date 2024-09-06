lint-frontend:
	make -C frontend lint

install:
	npm ci

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
	make install & make -C frontend install 
	npm run build
