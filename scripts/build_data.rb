#!/usr/bin/env ruby

require 'json'

def build_image(pwd, day, image)
  {
      :src => "#{pwd}/#{day}/#{image}".gsub(/.*content/, '/content')
  }
end

def build_day(day)
  pwd = Dir.pwd

  Dir.chdir(day)

  data = {
    :name => day,
    :tree => Dir.glob('*').inject([]){|memo, image| memo << build_image(pwd, day, image)}
  }

  Dir.chdir(pwd)

  data
end

def build_month(month)
  pwd = Dir.pwd

  Dir.chdir(month)

  data = {
    :name => month,
    :tree => Dir.glob('*').inject([]){|memo, day| memo << build_day(day); memo}
  }

  Dir.chdir(pwd)

  data
end

def build_year(year)
  pwd = Dir.pwd

  Dir.chdir(year)

  data = {
    :name => year,
    :tree => Dir.glob('*').inject([]){|memo, month| memo << build_month(month); memo}
  } 

  Dir.chdir(pwd)

  data
end


Dir.chdir("#{File.dirname(File.expand_path(__FILE__))}/../content")

result = Dir.glob('*').inject([]){|memo, year| memo << build_year(year); memo}

puts result.to_json