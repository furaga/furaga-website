#!/bin/bash
cd `dirname $0`
echo 'scraping: outputfile is ../../datas/items.json'
mkdir ../../datas
bundle exec ruby scrape.rb --video > ../../datas/items.json
