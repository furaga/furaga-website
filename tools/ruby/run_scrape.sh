#!/bin/bash
cd `dirname $0`
echo 'scraping: outputfile is ../../datas/items.json'
bundle exec ruby scrape.rb --video > ../../datas/items.json
