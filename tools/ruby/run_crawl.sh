#!/bin/bash
cd `dirname $0`
ruby crawl.rb --video
ruby crawl.rb --books
