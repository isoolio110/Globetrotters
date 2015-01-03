class UserlocationsController < ApplicationController

  def index
    render json: UserLocation.all.order(:id).to_json
  end

  def show
    render json: UserLocation.find(params[:id]).to_json
  end

  def destroy
    render json: UserLocation.destroy(params[:id]).to_json
  end

  def create
    location = current_user.user_locations.create(userlocation_params).to_json
    render json: location
  end

  def update
    userlocation = current_user.user_locations.find(params[:id])
    userlocation.update(userlocation_params)
    render json: userlocation.to_json
  end

  private

  def userlocation_params
    params.require(:userlocation).permit(:location, :planned_date, :visited_date)
  end

end