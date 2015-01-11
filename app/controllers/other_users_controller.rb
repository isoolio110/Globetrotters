class OtherUsersController < ApplicationController

  def index
    @other_users = User.find(params[:user_id]).users_who_wrote_about_same_locations
  end

end
