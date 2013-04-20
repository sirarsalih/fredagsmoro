#!/usr/bin/env ruby

require 'zip/zip'

output = <<-eot
---
title: #{ARGV[0]}
fun: true
---

<h1>#{ARGV[0]}</h1>

<div class="well">
  <%= prev_fun %>
  <%= next_fun %>
</div>

<% @item.children.each do |i| %>
<p><img src="<%= i.path %>"/></p>
<% end %>
eot

root = File.join(Dir::pwd, 'content', ARGV[0])
erb = "#{root}.erb"

if (!File.exists? erb)
  File.open("#{root}.erb", 'w') { |file| file.write(output) }
else
  puts "Erb found: #{erb}"
end

if (!File.exists? root)
  if File.directory?(ARGV[1])
    FileUtils.mv ARGV[1], root
  end
  
  if File.file?(ARGV[1]) 
    FileUtils.mkdir_p(root)

    Zip::ZipFile.open(ARGV[1]) do |zip_file|
      zip_file.each do |file|
        destination = File.join(root, file.name)
        zip_file.extract(file, destination) unless File.exist?(destination)
      end
    end
  end
else
  puts "Target found: #{erb}"
end