Rails.application.routes.draw do
  get 'welcome/index'

  resources :welcome
  root "welcome#index"

  get "/login"          => "sessions#new", as: "login"
  post "/sessions"      => "sessions#create"
  delete "/sessions"    => "sessions#destroy", as: "logout"

  resources :mostpopulardestinations

  # /users/...
  resources :users do
    resources :locations
    resources :stories
    resources :other_users
  end

end
