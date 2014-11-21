#!/usr/bin/env ruby

require 'net/imap'
require 'date'
require 'fileutils'
require 'base64'
require 'yaml'

config = YAML::load(File.open(File.dirname(File.expand_path(__FILE__)) + '/config.yml'))

imap = Net::IMAP.new(config[:host], config[:port], usessl = true, certs = nil, verify = false)
imap.login(config[:user], config[:pass])

if not imap.list('INBOX/Fredagsmoro/', 'Done')
  imap.create('INBOX/Fredagsmoro/Done')
end

imap.select('INBOX/Fredagsmoro')

imap.search(['ALL']).each do |message_id|
    msg = imap.fetch(message_id,['ENVELOPE','BODY'])[0]
    
    date = DateTime.parse(msg.attr['ENVELOPE']['date'])

    datepath = "content/#{'%04d' % date.year}/#{'%02d' % date.mon}/#{'%02d' % date.mday}"
    FileUtils.mkpath datepath
    
    body = msg.attr["BODY"]

    body.parts.each_with_index do |part, i|
      if part['media_type'] == "IMAGE" then
        filename = part['description']
        attachment = imap.fetch(message_id, "BODY[#{i+1}]")[0].attr["BODY[#{i+1}]"]
        File.new("#{datepath}/#{filename}",'wb+').write(Base64.decode64(attachment))
      end
    end

    imap.copy(message_id, "INBOX/Fredagsmoro/Done")
    imap.store(message_id, "+FLAGS", [:Deleted])
end

imap.expunge