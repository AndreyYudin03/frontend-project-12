lint-frontend:
	make -C frontend lint

lint-frontend-fix:
	make -C frontend lint-fix

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	npx start-server -s ./frontend/build
	npm start --prefix frontend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	make install & make -C frontend install
	npm run build
