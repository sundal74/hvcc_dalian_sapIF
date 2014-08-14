require "comp/version"
require "comp/pluggable_spot"

module Comp
  # Your code goes here...
end

Hatio::Bundle.new 'comp', 1.0 do |bundle|
  bundle.dependencies = ['hccdata']
end