require "prod/version"
require "prod/pluggable_spot"
require "prod/prod_util"

module Prod
  # Your code goes here...
end

Hatio::Bundle.new 'prod', 1.0 do |bundle|
  bundle.dependencies = ['base']
end

include Hatio::Util::ProdUtil