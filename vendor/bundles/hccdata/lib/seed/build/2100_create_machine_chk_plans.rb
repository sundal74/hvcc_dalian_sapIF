puts "Loading [2100_create_machine_chk_plan] file..."
MachineChkPlan.delete_all
domain = Domain.system_domain
admin = User.find("admin")

User.current_user = admin

machines = Machine.limit(25)
machine_cnt = machines.size
count = 0

10.upto(28) do |idx|
  date = "2013-03-#{idx}"
  machine = machines[idx % machine_cnt]
  pm_type = ((rand(2) % 2) == 0) ? "004" : "005"
  pm_part = ((rand(2) % 2) == 0) ? "D01" : "D02"
  data = {
    :name => machine.name,
    :description => "Machine [#{machine.name}] Check",
    :machine_id => machine.id,
    :pm_type => pm_type,
    :pm_part => pm_part,
    :plan_date => date,
    :due_date => Date.parse(date) + 6,
    :status => 'W'
  }
  save_data(domain.machine_chk_plans, data, admin)
  count += 1
end

10.upto(28) do |idx|
  date = "2013-04-#{idx}"
  machine = machines[idx % machine_cnt]
  pm_type = ((rand(2) % 2) == 0) ? "004" : "005"
  pm_part = ((rand(2) % 2) == 0) ? "D01" : "D02"
  data = {
    :name => machine.name,
    :description => "Machine [#{machine.name}] Check",
    :machine_id => machine.id,
    :pm_type => pm_type,
    :pm_part => pm_part,
    :plan_date => date,
    :due_date => Date.parse(date) + 6,
    :status => 'W'
  }
  save_data(domain.machine_chk_plans, data, admin)
  count += 1
end

puts "Total #{count} MachineChkPlan Loaded!"