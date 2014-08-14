Hatio::Application.routes.draw do

  resources :domains do
		resources :prod_closings do
			collection do
				post :update_multiple
				get :exist
			end
		end

		resources :label_models do
			collection do
				post :update_multiple
			end
		end

		resources :worker_times do
			collection do
				post :update_multiple
				get :export
			end
		end

		resources :spc_items do
			collection do
				post :update_multiple
				get :export
			end
			member do
			  get :spc_values
			  post :import_spc_values
		  end
		end

		resources :serial_lots do
			collection do
				post :update_multiple
				post :export
			end
		end

		resources :rm_lots do
			collection do
				post :update_multiple
				post :export
			end
			member do
			  get :rm_lot_track
		  end
		end

		resources :label_masters do
			collection do
				post :update_multiple
				post :import
				get :export
			end
		end

		resources :defects do
			collection do
				post :update_multiple
				get :export
				get :defects_by_order
				get :new_scrap_bom
			end
		end

		resources :qty_actuals do
			collection do
				post :update_multiple
				get :export
			end
		end

		resources :machine_chk_plans do
			collection do
				post :update_multiple
				get :export
			end
		end

		resources :label_plans do
			collection do
				post :update_multiple
				post :export
				post :list_print_info
				post :create_daily_plan
				get :show_by_name
			end
			
			member do
        get :get_print_info
				post :reprint
				post :update_print_count
		  end
		end
		
		resources :machine_losses do
			collection do
				post :update_multiple
				get :export
			end
		end

		resources :inventory_hists do
			collection do
				post :update_multiple
				get :export
			end
		end

		resources :inventories do
			collection do
				post :update_multiple
				get :export
			end
			member do
	      post :transfer
      end
		end

		resources :lots do
			collection do
				post :update_multiple
				get :export
				get :show_by_name
			end
			member do
			  get :lot_track
			  get :serial_track
		  end
		end

		resources :prod_plans do
			collection do
				post :update_multiple
				post :export
				post :import
				get :show_by_name
				post :generate_order
			end
		end

		resources :prod_orders do
			collection do
				post :update_multiple
				get :export
				get :show_by_name
			end
		end

		resources :std_work_docs do
			collection do
				post :update_multiple
				get :export
			end
		end

		resources :notices do
			collection do
				post :update_multiple
				get :export
			end
		end

		resources :defect_codes do
			collection do
				post :update_multiple
				get :export
				post :import
				get :show_by_name
				get :operation_defect_codes
				get :list_by_operation
				post :add_by_operation
				post :op_defect_import
			end
		end

		resources :loss_templates do
			collection do
				post :update_multiple
				get :export
				post :import
			end
		end

		resources :loss_codes do
			collection do
				post :update_multiple
				get :export
				post :import
				get :show_by_name
			end
		end

		resources :stores do
			collection do
				post :update_multiple
				get :export
				get :show_by_name
			end
		end
		
		resources :prod_params do
			collection do
				post :update_multiple
				get :export
				post :import
			end
		end
		
		resources :machines do
			collection do
				post :update_multiple
				get :export
				post :import
				get :show_by_name
			end
		end
		
		resources :operations do
			collection do
				post :update_multiple
				get :export
				get :show_by_name
				post :import
				post :op_workers_import
				get :list_operator
				post :save_operators
				post :move_operator
			end
		end

		resources :workcenters do
			collection do
				post :update_multiple
				post :export
				post :import
				get :show_by_name
			end
		end
		
		resources :boms do
		  collection do
		    post :update_multiple
				post :export
		    get :show_by_name
		    post :import
	    end
	    member do
	      get :child_products
      end
	  end

    resources :products do
      collection do
        post :update_multiple
				get :export
        get :show_by_name
        post :import
      end
      member do
        get :child_products
      end
    end
    
		resources :suppliers do
			collection do
				post :update_multiple
				get :export
				get :show_by_name
				post :import
			end
		end

		resources :customers do
			collection do
				post :update_multiple
				get :export
				get :show_by_name
				post :import
			end
		end
		
		resources :raw_materials do
      collection do
        post :update_multiple
				get :export
        get :show_by_name
        post :import
      end
	  end
  end

end
