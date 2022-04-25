builder:
	docker-compose build

develop:
	docker-compose run --service-ports doc env $(ENV) yarn develop -H 0.0.0.0

format:
	docker-compose run doc yarn format

format-uc-doc:
	docker-compose run --no-TTY doc yarn format:uc-doc

build:
	rm -rf public
	docker-compose up -d doc
	docker-compose exec -T doc env $(ENV) yarn build
	docker cp "$$(docker-compose ps -q doc)":/app/public public
	docker-compose down

test:
	docker-compose -f docker-compose.yml -f docker-compose-tests.yml up --exit-code-from test test

clean:
	docker-compose down

import:
	./import-plantuml.sh

DIAGRAM_DIRECTORY=public/diagrams
plantuml-diagrams:
	mkdir -p $(DIAGRAM_DIRECTORY)
	for f in $$(find content -name '*.puml'|grep -v /plantuml/); do \
		cp -p $$f $(DIAGRAM_DIRECTORY)/$$(basename $$(dirname $$f))-$$(basename $$f); \
	done
	$(MAKE) plantuml-run
	rm -f $(DIAGRAM_DIRECTORY)/*.puml

plantuml-run:
	outputs="$(patsubst %.puml,%.svg,$(wildcard $(DIAGRAM_DIRECTORY)/*.puml))"; \
	cp content/plantuml/*.puml $(DIAGRAM_DIRECTORY); \
	$(MAKE) $${outputs}

%.svg: %.puml
	java -jar ${JAVA_HOME}/lib/plantuml.jar -tsvg -o$(DIAGRAM_DIRECTORY) $^


.PHONY: builder build develop format test clean import plantuml-diagrams
