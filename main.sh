#!/bin/bash

export filename="source.html"

# if file does not exist or does and is older than 1 day
if [ ! -f "$filename" ] || [ $(find "$filename" -mtime +1 -print) ]; then
	# file is missing, or more than 1 day old
	#echo "File does not exist or is > 1 day old"
	export PID=`cat config.json | jq -r .propertyid`
	#echo "Using propertyid: $PID"
	export URL="https://recyclingservices.bromley.gov.uk/property/$PID"
	#echo "Using URL: $URL"
	wget -O "$filename" "$URL"
else
	# file is newer than 1 day, do nothing
	#echo "File exists and is new enough"
    : 
fi

node main.js "$filename"
