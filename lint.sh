#!/bin/bash

set -eux

prettier --config ".prettierrc" --write "src/**/*.js"
