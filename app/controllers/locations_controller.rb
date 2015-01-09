class LocationsController < ApplicationController

  def index
    render json: Location.where(user_id: params[:user_id]).order(:id).to_json
  end

  def show
    render json: Location.find(params[:id]).to_json
  end

  def destroy
    render json: Location.destroy(params[:id]).to_json
  end

  def create
    binding.pry
    location = Location.new(location_params)
    if location.save
      render json: location.to_json, status: 200
    else
      render json: { message: "Something went wrong." }.to_json
    end
  end

  def update
    location = current_user.locations.find(params[:id])
    location.update(location_params)
    render json: location.to_json
  end

  private

  def location_params
    params.require(:location).permit(:location, :user_id, :planned_date, :visited_date)
  end

end