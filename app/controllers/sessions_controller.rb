class SessionsController < ApplicationController
  def login
    user = User.find_by({username: params[:username]})
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to "/#userlocations/#{user.id}"
    else
      session[:user_id] = nil
      redirect_to root_path
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to root_path
  end
end
