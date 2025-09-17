#!/bin/bash
HEADER='{"alg":"HS256","typ":"JWT"}'
PAYLOAD='{"sub":"1234567890","name":"John Doe","iat":1516239022}'
SECRET='mysecret'

HEADER_B64=$(echo -n $HEADER | base64 | tr -d '=' | tr '/+' '_-')
PAYLOAD_B64=$(echo -n $PAYLOAD | base64 | tr -d '=' | tr '/+' '_-')
SIGNATURE=$(echo -n "$HEADER_B64.$PAYLOAD_B64" | openssl dgst -sha256 -hmac $SECRET -binary | base64 | tr -d '=' | tr '/+' '_-')

echo "$HEADER_B64.$PAYLOAD_B64.$SIGNATURE"
