SHELL = /bin/bash
MAKEFLAGS += --no-print-directory --silent
export PATH := ./node_modules/.bin/:$(PATH):./bin/

setup:
	npm install --quiet > /dev/null; true

default: ci

lint: setup
	standard

dev:
	tap __tests__/

watch: dev

test: setup
	tap __tests__/

coverage:
	tap __tests__/ -R spec --100

pre-commit: lint

ci: lint test

.PHONY: release-patch release-minor release-major
release-patch release-minor release-major: ci
	git push
	npm version $(@:release-%=%)
	npm publish

.PHONY: ci clean dev doc help lint release setup test
