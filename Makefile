SERVER_SCRIPT_PATH = scripts/server/index.js

run-dev:
	@NODE_ENV=dev ./node_modules/.bin/supervisor -i node_modules ${SERVER_SCRIPT_PATH}

run-dev-debug:
	@NODE_ENV=dev ./node_modules/.bin/supervisor -x node-debug -i node_modules ${SERVER_SCRIPT_PATH}
