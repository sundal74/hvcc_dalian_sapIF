Hatio::PluggableSpot::add_domain_pluggable do
  # HAS_MANY BEGIN BLOCK DON'T REMOVE
	has_many :pms_spc_alarms
  has_many :pms_master_errors
  has_many :pms_master_models
  has_many :pms_master_stations
  has_many :pms_master_items
end