require "hcc/version"
require "hcc/pluggable_spot"

module Hcc
  # Your code goes here...
end

Hatio::Bundle.new 'hcc', 1.0 do |bundle|
  bundle.dependencies = ['prod']
end