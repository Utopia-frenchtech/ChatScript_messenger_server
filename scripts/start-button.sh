#!/usr/bin/env bash

curl -X POST -H "Content-Type: application/json" -d '{
  "get_started":{
    "payload": "START"
  }
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=yourAccessToken"