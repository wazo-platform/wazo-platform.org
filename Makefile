builder:
	docker-compose build

develop:
	docker-compose run --service-ports doc env $(ENV) yarn develop -H 0.0.0.0

format:
	docker-compose run doc yarn format

build:
	rm -rf public
	docker-compose up -d doc
	docker-compose exec -T doc env $(ENV) yarn build
	docker cp "$$(docker-compose ps -q doc)":/app/public public
	docker-compose down

test:
	docker-compose up --exit-code-from test test

clean:
	docker-compose down

import:
	./import-plantuml.sh

.PHONY: builder build develop format test clean import
