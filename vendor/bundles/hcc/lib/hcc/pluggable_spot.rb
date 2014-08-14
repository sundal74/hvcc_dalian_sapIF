Hatio::PluggableSpot::add_domain_pluggable do
  # HAS_MANY BEGIN BLOCK DON'T REMOVE
  has_many :sum_hourly_actuals
  has_many :sum_prod_effs
  has_many :sum_oee
  has_many :sum_ftt
  has_many :sum_bts
  has_one :current_work_date
end