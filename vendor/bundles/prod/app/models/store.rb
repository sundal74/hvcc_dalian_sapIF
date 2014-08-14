class Store < ActiveRecord::Base

  set_table_name :operations
  
  stampable
  trace_removable
  meaningful_id [:domain_id, :name]
  default_scope where(:inv_flag => true, :deleted_at => nil)
  
  belongs_to :domain
  has_many :inventories
  attr_accessible :name,:description
  before_create :set_store
  
  public
    #
    # inventory in
    #
    def inv_in(product_id, qty)
      inv = Inventory.find_inv(self.domain, self.id, product_id)
      inv.inv_in(qty)
    end
    
    #
    # inventory out
    #
    def inv_out(product_id, qty)
      inv = Inventory.find_inv(self.domain, self.id, product_id)
      inv.inv_out(qty)
    end
    
    #
    # In action
    # inv_data : {:product_id => "", :qty => 100}
    #
    def do_in(inv_data)      
      self.inv_in(inv_data[:product_id], inv_data[:qty])
    end
    
    #
    # Out action
    # inv_data : {:product_id => "", :qty => 100}
    #
    def do_out(inv_data)
      self.inv_in(inv_data[:product_id], inv_data[:qty])
    end
    
    #
    # Transfer action
    # inv_data : {product_id : "", target_store_id : "", qty : ""}
    #
    def do_transfer(inv_data)
      raise "Inventory data is empty!" if (inv_data.nil? || inv_data.empty?)
      inv = Inventory.find_inv(self.domain, self.id, inv_data[:product_id])
      inv.inv_transfer(inv_data[:target_store_id], inv_data[:qty])
    end
    
    #
    # Reconcile action
    # inv_data : {product_id : "", reconciled_qty : ""}
    #
    def do_reconcile(inv_data)
      raise "Inventory data is empty!" if (inv_data.nil? || inv_data.empty?)
      inv = Inventory.find_inv(self.domain, self.id, inv_data[:product_id])
      inv.inv_reconcile(inv_data[:reconciled_qty], inv_data[:description])
    end
    
  private 
  
  #
  # store 설정 
  #
  def set_store
    self.inv_flag = true
  end

end
