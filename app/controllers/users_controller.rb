class UsersController < ApplicationController
  def index
    @users = User.all
    user_info = []
    @users.each do |user|
      if user != current_user
      user_info << {id: user.id, current_user: 0, username: user.username, image_url: user.avatar.url(:medium)}
      else
      user_info << {id: user.id, current_user: 1, username: user.username, image_url: user.avatar.url(:medium)}
      end
    end
    render json: user_info.to_json
  end

  def show
  end

  def new
    @user = User.new
  end

  def create
    user = User.create(user_params)
    if user.valid?
      redirect_to "/login"
    else
      @errors = user.errors.full_messages
      @user = User.new
      render "new"
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :first_name, :last_name, :avatar)
  end
end
