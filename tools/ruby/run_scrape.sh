#!/bin/bash
cd `dirname $0`
echo 'scraping: outputfile is ../../datas/items.json'
ruby scrape.rb --video > ../../datas/items.json
