class InventoryHist < ActiveRecord::Base

	universal_unique_id
	stampable
	belongs_to :domain
	belongs_to :inventory
	belongs_to :store
	belongs_to :machine
	belongs_to :product
	belongs_to :lot
	belongs_to :from_store, :class_name => 'Store', :foreign_key => 'from_store_id'
	belongs_to :to_store, :class_name => 'Store', :foreign_key => 'to_store_id'
	attr_accessible :inventory_id,:store_id,:machine_id,:product_id,:qty,:action_code,:lot_id,:from_store_id,:to_store_id,:description,:inv_qty,:lot_type

	validates :domain_id, :inventory_id, :store_id, :presence => true
	validates_inclusion_of :action_code, :in => %w(IN OUT TRANSFER ADJUST), :message => "%{value} is not a action code"
end
