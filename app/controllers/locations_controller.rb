class LocationsController < ApplicationController

  def index
    @locations = Location.where(user_id: params[:user_id]).order(:id)
  end

  def show
    render json: Location.find(params[:id]).to_json
  end

  def destroy
    render json: Location.destroy(params[:id]).to_json
  end

  def create
    location = Location.new(location_params)
    location.user = current_user
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
    {
      place: params[:place],
      user_id: params[:user_id],
      planned_date: params[:planned_date],
      visited_date: params[:visited_date]
    }
  end

end
