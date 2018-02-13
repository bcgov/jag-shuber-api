#!/usr/bin/env bash

oc export svc,dc,route --as-template=shuber-api-deploy -l app=shuber-api -o json > deploy-temp.json
oc export bc,is --as-template=shuber-api-build -l app=shuber-api -o json > build-temp.json