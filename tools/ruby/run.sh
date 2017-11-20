#!/bin/bash
cd `dirname $0`
./run_crawl.sh && \
./run_scrape.sh && \
rm -rf ../../build/img && \
rm -rf ./data/img && \
echo `date +%Y%m%d_%H-%M-%S:` 'Finished crawling and scraping.'
