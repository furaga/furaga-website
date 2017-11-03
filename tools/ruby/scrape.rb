require 'open-uri'
require 'nokogiri'
require "json"

def scrape_niconico_anime(path, datas)
    charset = 'utf-8'
    html = File.open(path) do |f| f.read end
    doc = Nokogiri::HTML.parse(html, nil, charset)

    lis = doc.css('.video.cfix.selected')
    lis.each do |li|
        data = {}
        inputs = li.css('input')
        inputs.each do |input|
            name = input.attribute('name').value
            value = input.attribute('value').value
            data[name] = value
        end
        data["url"] = "http://www.nicovideo.jp/watch/" + li.attribute('id').value.split('_')[2]
        data['official_site'] = "ニコニコ動画"
        data['date'] = data['start_time'] 
        if data.key?('title') then
            datas.push(data)
        end 
    end
end

def scrape_prime_anime(path, datas)
    charset = 'utf-8'
    html = File.open(path) do |f| f.read end
    doc = Nokogiri::HTML.parse(html, nil, charset)

    divs = doc.css('li .a-fixed-left-grid')
    divs.each do |div|
        data = {}
        div.css('.s-access-detail-page').each do |a|
            data['title'] = a.attribute('title').value
            data['url'] = a.attribute('href').value
        end
        div.css('img').each do |img|
            data['thumbnail_url'] = img.attribute('src').value
        end
        data['date'] = ""
        data['official_site'] = "Amazon Prime Video"
        if data.key?('title') then
            datas.push(data)
        end 
    end
end

def scrape_syosetu(path, datas)
    charset = 'utf-8'
    html = File.open(path) do |f| f.read end
    doc = Nokogiri::HTML.parse(html, nil, charset)

    tables = doc.css('.favnovel')
    tables.each do |tbl|
        data = {}
        tbl.css('.title2 a').each do |a|
            data['title'] = a.inner_html.strip
        end
        tbl.css('.info2 p span a').each do |a|
            data['url'] = a.attribute('href').value
            data['title'] = data['title'] + " " + a.inner_html.strip
        end

        tbl.css('.info2 p').each do |p|
            text = p.inner_html
            starts = text.index('更新日')
            ends = text.index('<span', starts)
            if starts >= 0 && ends > starts then
                data['date'] = p.inner_html[starts, ends - starts].strip
                break
            end
        end

        data['banner_url'] = "https://static.syosetu.com/view/images/user_logo.gif?mpc5l6"
        data['official_site'] = "小説家になろう"

        if data.key?('title') then
            datas.push(data)
        end 
    end
end

def checkArgv(flg)
    return ARGV.include?('--all') || ARGV.include?(flg)
end

datas = []
if checkArgv('--video') then
    scrape_prime_anime("./data/html/amazon/prime_video/prime_anime.html", datas)
    scrape_niconico_anime("./data/html/niconico/niconico_anime.html", datas)
end

if checkArgv('--books') then
    scrape_syosetu("./data/html/syosetu/isnoticelist.html", datas)
end

puts "[" + datas.map{|d| JSON.pretty_generate(d) }.join(',') + "]"
