Hatio::Application.routes.draw do

  resources :domains do
		resources :pms_spc_alarms do
			collection do
				post :update_multiple
			end
		end

		resources :pms_master_items do
			collection do
				post :update_multiple
				get :spc_values
			end
		end

		resources :pms_master_errors do
			collection do
				post :update_multiple
			end
		end

		resources :pms_master_models do
			collection do
				post :update_multiple
			end
		end

		resources :pms_master_stations do
			collection do
				post :update_multiple
				get :export
			end
		end
	end
	
end
