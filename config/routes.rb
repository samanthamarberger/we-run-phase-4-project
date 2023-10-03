Rails.application.routes.draw do
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/me', to: 'users#update'
  delete '/me', to: 'users#destroy'

  # add the only keywords
  resources :trails do
    resources :reviews, only: [ :create, :index, :update, :show, :destroy ]
  end

  resources :users, only: [:update] 
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
