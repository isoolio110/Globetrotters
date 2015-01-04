Rails.application.routes.draw do
  get 'welcome/index'

  resources :welcome
  root "welcome#index"

  get "/login" => "users#login", as: "login"
  post "/sessions" => "sessions#login"
  delete "/sessions" => "sessions#logout", as: "logout"

  resources :users
  resources :userlocations
  resources :mostpopulardestinations

end
