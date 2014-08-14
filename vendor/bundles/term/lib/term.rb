require "term/version"
require "term/pluggable_spot"

module Term
  # Your code goes here...
end

Hatio::Bundle.new 'term', 1.0 do |bundle|
  bundle.dependencies = ['prod']
end