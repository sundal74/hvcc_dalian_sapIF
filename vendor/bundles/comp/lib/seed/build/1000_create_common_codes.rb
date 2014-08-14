puts "Loading [1000_create_common_codes] file..."

CommonCode.setup domain, :PMS_ALARM, {:description => 'PMS ALARM'} do
  code '1' => 'TSFR'
  code '2' => 'ERROR'
  code '3' => 'MEASURE MISSING'
  code '4' => 'NG PRODUCT'
end

CommonCode.setup domain, :SPC_ALARM, {:description => 'SPC ALARM'} do
  code '1' => 'Up and Down 4P'
  code '2' => 'Continuous Up or Down 6P'
  code '3' => 'Above or Below CL 9P'
  code '4' => 'Out Of USL/LSL'
end

puts "Common Codes loaded successfully!"