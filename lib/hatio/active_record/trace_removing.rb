module Hatio
  module TraceRemoving
    
    def self.included(base) #:nodoc:
      super
      base.extend(ClassMethods)
      base.class_eval do
        include InstanceMethods        
      end
    end

    module ClassMethods
      def trace_removable
        class_eval do
          after_destroy :hatio_trace_removing
        end
      end
    end

    module InstanceMethods #:nodoc:
      private
        def hatio_trace_removing
          # self 정보를 모두 REM_TRACES 테이블에 추가 
          rem_trace = RemTrace.new
          rem_trace.entity_type = self.class.name
          rem_trace.entity_id = self.id
          rem_trace.rem_content = self.to_json
          rem_trace.domain_id = self.domain_id
          rem_trace.save!
        end        
    end
    
  end
end
