#!/bin/sh

set -e

TEMPLATE_FILE="/tmp/reearth_config.json.tmpl"
OUTPUT_FILE="/opt/reearth-marketplace/reearth_config.json"

envsubst < "$TEMPLATE_FILE" > "$OUTPUT_FILE"
