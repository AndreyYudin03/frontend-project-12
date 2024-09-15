install:
	npm ci
	
build:
	make install
	npm build

lint:
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .

lint-fix:
	npx eslint --fix --ext js,jsx --no-eslintrc --config .eslintrc.yml .