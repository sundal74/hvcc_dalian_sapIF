module Hatio
  module Util
    # Simple util class
    module ProdUtil
      
      # 
      # 워크센터 - 공정 association condition
      #
      def wc_op_assoc_condition(params, conditions)
        p = params[:_q].blank? ? params : params[:_q]
        conditions ||= [""]
        
        if(p['operation.name-eq'].blank? && p['operation_id-eq'].blank?)
          if(!p['workcenter.name-eq'].blank?)
            conditions[0] << " and operation_id in (select id from operations where deleted_at IS NULL and workcenter_id = (select id from workcenters where name = ?))"
            conditions.push(p.delete('workcenter.name-eq'))
          elsif(!p['workcenter_id-eq'].blank?)
            conditions[0] << " and operation_id in (select id from operations where deleted_at IS NULL and workcenter_id = ?"
            conditions.push(p.delete('workcenter_id-eq'))
          end
        else(!p['operation.name-eq'].blank? || !p['operation_id-eq'].blank?)
          p.delete('workcenter.name-eq')
          p.delete('workcenter_id-eq')
          if(!p['operation.name-eq'].blank?)
            conditions[0] << " and operation_id = (select id from operations where deleted_at IS NULL and name = ?)"
            conditions.push(p.delete('operation.name-eq'))
          elsif(!p['operation_id-eq'].blank?)
            conditions[0] << " and operation_id = ?"
            conditions.push(p.delete('operation_id-eq'))
          end
        end
        
        return conditions
      end
      
      # 
      # 워크세터, 공정 파라미터로 설비 리스트를 가져오는 조건을 생성 
      # 워크센터 - 공정 - 설비 association condition
      #
      def wc_op_mc_assoc_condition(params, conditions)
        p = params[:_q].blank? ? params : params[:_q]
        
        # 설비만 넘어온 경우 
        if(!p['machine.name-eq'].blank? || !p['machine_id-eq'].blank?)
          conditions = ["id is not null"] if (conditions.nil?)
          if(!p['machine.id-eq'].blank?) 
            conditions[0] << " and machine_id = ?"
          else
            conditions[0] << " and machine_id = (select id from machines where name = ?)"
          end
          conditions.push(p['machine.name-eq'].blank? ? p['machine.id-eq'] : p['machine.name-eq'])
          
        # 공정이 넘어온 경우 
        elsif(!p['operation.name-eq'].blank? || !p['operation_id-eq'].blank?)
          conditions = ["id is not null"] if (conditions.nil?)
          if(!p['operation.name-eq'].blank?) 
            # conditions[0] << " and machine_id in (select id from machines where main_op_flag = ? and operation_id = (select id from operations where name = ?))"
            conditions[0] << " and machine_id in (select id from machines where operation_id = (select id from operations where name = ?))"
          else
            # conditions[0] << " and machine_id in (select id from machines where main_op_flag = ? and operation_id = ?)"
            conditions[0] << " and machine_id in (select id from machines where operation_id = ?)"
          end
          # conditions.push(true)
          conditions.push(p['operation.name-eq'].blank? ? p['operation.id-eq'] : p['operation.name-eq'])
          
        # 공정만 넘어 온 경우 
        elsif(!p['workcenter.name-eq'].blank? || !p['workcenter_id-eq'].blank?)
          conditions = ["id is not null"] if (conditions.nil?)
          if(!p['workcenter.name-eq'].blank?) 
            # conditions[0] << " and machine_id in (select id from machines where main_op_flag = ? and operation_id in (select id from operations where workcenter_id = (select id from workcenters where name = ?)))"
            conditions[0] << " and machine_id in (select id from machines where operation_id in (select id from operations where workcenter_id = (select id from workcenters where name = ?)))"
          else
            # conditions[0] << " and machine_id in (select id from machines where main_op_flag = ? and operation_id in (select id from operations where workcenter_id = ?))"
            conditions[0] << " and machine_id in (select id from machines where operation_id in (select id from operations where workcenter_id = ?))"
          end
          # conditions.push(true)
          conditions.push(p['workcenter.name-eq'].blank? ? p['workcenter.id-eq'] : p['workcenter.name-eq'])
        end
        
        return conditions
      end
      
    end
  end
end