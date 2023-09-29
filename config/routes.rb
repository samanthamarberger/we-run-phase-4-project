Rails.application.routes.draw do
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/trails/:id', to: 'trails#show'
  # get '/trails/:id/reviews', to: 'reviews#index'

  # add the only keywords
  resources :trails do
    resources :reviews, only: [ :create, :index, :update, :show, :destroy ]
  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
