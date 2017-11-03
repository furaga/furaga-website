require 'open-uri'
require 'nokogiri'
require 'net/http'
require 'json'
require 'uri'
#require 'robotex'

# robotex = Robotex.new
# puts robotex.allowed?("http://www.yahoo.co.jp/")

$charset = nil
$user_agent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.63 Safari/537.36'

def read_html(url)
    content = open(url, "User-Agent" => $user_agent) do |f|
        $charset = f.charset
        f.read
    end
    # DOS攻撃しないようにHTML読み込み後は常に一秒待つ
    sleep(0.2)
    content
end

def save_html(content, filepath)
    dirname = File.dirname(filepath)
    unless File.directory?(dirname)
        FileUtils.mkdir_p(dirname)
    end
    File.open(filepath, "w") do |f|
        f.puts(content)
    end
    puts "saved: " + filepath
end

def download(url, savepath)
    begin
        event_html = read_html(url)
        encoded = URI.encode(url)
        save_html(event_html, savepath)
    rescue OpenURI::HTTPError => e
        if e.message == '404 Not Found'
            puts '404 Not Found: ' + url
        else
            puts 'Some error happened during reading ' + url
        end
        puts 'Failed to download "' + url + '"'
    end
end

def checkArgv(flg)
    return ARGV.include?('--all') || ARGV.include?(flg)
end

if checkArgv('--video') then
    url  = 'http://ch.nicovideo.jp/portal/anime?cc_referrer=nicotop_sidemenu'
    download(url, "./data/html/niconico/niconico_anime.html")

#    url  = 'https://www.amazon.co.jp/s/ref=atv_?_encoding=UTF8&bbn=2351650051&field-entity_type=4174099051&field-ways_to_watch=3746330051&node=2351649051%2C%212351650051%2C2478407051&pf_rd_i=home&pf_rd_m=AN1VRQENFRJN5&pf_rd_p=469882449&pf_rd_r=81EJ2Z8X5T23ERNAVVYZ&pf_rd_s=center-13&pf_rd_t=12401&search-alias=instant-video&sort=-prime_video_start_date'
#    download(url, "./data/html/amazon/prime_video/prime_anime.html")
end