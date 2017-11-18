#!/bin/bash
cd `dirname $0`
echo 'scraping: outputfile is ../../datas/*.json'
mkdir ../../datas
bundle exec ruby scrape.rb --video > ../../datas/items.json
bundle exec ruby scrape.rb --comic > ../../datas/items-comic.json
