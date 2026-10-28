#!/bin/sh
# Tags the local tax-calculator image and pushes it to IBM Cloud Container Registry (ICR).
# Run where you are logged in to IBM Cloud (your IBM Skills Network lab terminal or a local machine
# with the ibmcloud CLI + container-registry plugin), and where the image tax-calculator:1.0 exists.
#
# Usage:
#   ICR_REGION=us.icr.io ICR_NAMESPACE=<your-namespace> sh scripts/05-push-to-icr.sh | tee 05-docker-icr-push
#
# In the Skills Network lab the namespace is available as $SN_ICR_NAMESPACE.

set -e

ICR_REGION=${ICR_REGION:-us.icr.io}
ICR_NAMESPACE=${ICR_NAMESPACE:-$SN_ICR_NAMESPACE}
IMAGE=tax-calculator
TAG=${TAG:-1}

if [ -z "$ICR_NAMESPACE" ]; then
  echo "Set ICR_NAMESPACE (or SN_ICR_NAMESPACE) first" >&2
  exit 1
fi

run() {
  echo
  echo "\$ $*"
  "$@"
}

run ibmcloud cr login
run docker tag $IMAGE:1.0 $ICR_REGION/$ICR_NAMESPACE/$IMAGE:$TAG
run docker push $ICR_REGION/$ICR_NAMESPACE/$IMAGE:$TAG
run ibmcloud cr image-list --restrict "$ICR_NAMESPACE"
