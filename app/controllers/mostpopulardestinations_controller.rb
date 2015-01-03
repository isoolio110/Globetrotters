class MostpopulardestinationsController < ApplicationController
  def index
    render json: MostPopularDestination.all.order(:id).to_json
  end
end
