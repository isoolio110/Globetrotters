class StoriesController < ApplicationController

  def index
    render json: Story.all.order(:id).to_json
  end

  def show
    render json: Story.find(params[:id]).to_json
  end

  def destroy
    render json: Story.destroy(params[:id]).to_json
  end

  def create
    story = current_user.stories.create(stories_params).to_json
    render json: story
  end

  def update
    story = current_user.stories.find(params[:id])
    story.update(stories_params)
    render json: story.to_json
  end

  private

  def stories_params
    params.require(:story).permit(:title, :location, :description, :packlist)
  end

end
