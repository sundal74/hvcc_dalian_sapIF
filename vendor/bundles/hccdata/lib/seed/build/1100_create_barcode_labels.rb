puts "Loading [1100_create_label_models] file..."

LabelModel.delete_all
domain = Domain.system_domain
admin = User.find("admin")
User.current_user = admin

puts "Label Model data creating..."
label_model = "CT~~CD,~CC^~CT~
^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR2,2~SD15^JUS^LRN^CI0^XZ
^XA
^MMT
^PW602
^LL1476
^LS0
^FT536,96^A0R,43,52^FH\^FDHalla Visteon Climate Control(Thailand)Co.,Ltd.^FS
^FT234,646^A0R,42,36^FH\^FDSeiral : ^FS
^FT155,294^A0R,42,36^FH\^FDLot Size: ^FS
^FT309,646^A0R,42,36^FH\^FDQ`ty : ^FS
^FT393,78^A0R,42,36^FH\^FDPart No. : ^FS
^FT470,78^A0R,42,36^FH\^FDRouting : ^FS
^FT321,78^A0R,42,40^FH\^FDOption : ^FS
^FT74,293^A0R,42,40^FH\^FDLot No. : ^FS
^FT318,249^A0R,42,48^FH\^FD${CUSTOMER}^FS
^FT436,1336^A0N,33,28^FH\^FDQ'ty.^FS
^FT200,1437^A0N,25,24^FH\^FD${LOT_NO}^FS
^FT200,1384^A0N,25,24^FH\^FD${PART_NAME}^FS
^FT199,1333^A0N,33,33^FH\^FD${PART_NO}^FS
^FT496,1343^A0N,42,40^FH\^FD${QTY}^FS
^FT154,474^A0R,42,48^FH\^FD${LOT_SIZE}^FS
^FT234,774^A0R,42,48^FH\^FD${SERIAL_NO}^FS
^FT312,764^A0R,58,57^FH\^FD${QTY}^FS
^FT315,426^A0R,42,31^FH\^FD${CUSTOMER_NAME}^FS
^FT393,249^A0R,50,50^FH\^FD${PART_NO}^FS
^FT393,644^A0R,33,33^FH\^FD${PART_NAME}^FS
^FT467,645^A0R,33,33^FH\^FD${OPERATION_NAME}^FS
^FT470,247^A0R,42,81^FH\^FD${OPERATION}^FS
^BY110,110^FT176,1301^BXI,5,200,0,0,1,_
^FH\^FD${LABEL_NUMBER}^FS
^BY176,176^FT238,82^BXI,8,200,0,0,1,_
^FH\^FD${LABEL_NUMBER}^FS
^FT71,475^A0R,42,40^FH\^FD${LOT_NO}^FS
^PQ1,0,1,Y^XZ"
data = {:name => 'SmallSize', :description => 'Small Size', :printer_type => 'DPL', :command => label_model, :active_flag => true}
save_data(domain.label_models, data, admin)

data = {:name => 'LargeSize', :description => 'Large Size', :printer_type => 'DPL', :active_yn => false}
save_data(domain.label_models, data, admin)

puts "Total 2 Label Model Loaded!"