.PHONY: build

builder:
	docker-compose build

develop:
	docker-compose run --service-ports doc yarn develop -H 0.0.0.0

format:
	docker-compose run doc yarn format

build:
	rm -rf public
	docker-compose up -d doc
	docker-compose exec -T doc yarn build
	docker cp "$$(docker-compose ps -q doc)":/app/public public
	docker-compose down

test:
	docker-compose up --exit-code-from test test
