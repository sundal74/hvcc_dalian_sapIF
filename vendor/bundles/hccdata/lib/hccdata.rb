require "hccdata/version"

module Hccdata
  # Your code goes here...
end

Hatio::Bundle.new 'hccdata', 1.0 do |bundle|
  bundle.dependencies = ['hcc']
end