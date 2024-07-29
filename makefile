build:
	rm -rf frontend/build
	npm run build

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build