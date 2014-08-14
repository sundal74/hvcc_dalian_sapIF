class ProductPart < ActiveRecord::Base

  stampable
  trace_removable
  universal_unique_id
  belongs_to :domain
  belongs_to :parent_product, :class_name => "Product", :foreign_key => "parent_product_id"
  belongs_to :child_product, :class_name => "Product", :foreign_key => "child_product_id"
  attr_accessible :parent_product_id, :child_product_id, :qty, :unit, :bom_type

end
