#!/usr/bin/env ruby

require 'date'
require 'fileutils'
require 'base64'
require 'yaml'


config = YAML::load(File.open(File.dirname(File.expand_path(__FILE__)) + '/dropbox.yml'))

path = config[:path]

date = DateTime.now
datepath = "site/content/#{'%04d' % date.year}/#{'%02d' % date.mon}/#{'%02d' % date.mday}"
FileUtils.mkpath datepath

Dir.foreach(path) do |item|
  itempath = path + "/" + item
  next unless File.file?(itempath)
  next unless (File.size(itempath) > 100)

  FileUtils.mv(itempath, "#{datepath}/#{item}")
end

system("$PWD/scripts/resize.sh #{datepath}")
