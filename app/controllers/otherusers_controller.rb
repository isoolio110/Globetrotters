class OtherusersController < ApplicationController

  def index
    otherusers = []
    Location.find_each do |location|
      Story.where(location: location.location).find_each do |story|
        otherusers << {user_id: location.user_id, location: location.location, other_user_id: story.user_id}
      end
    end

    otherusersinfo = []
    otherusers.each do |otheruser|
      User.where(id: otheruser[:other_user_id]).find_each do |user|
          otherusersinfo << {user_id: otheruser[:user_id], location: otheruser[:location], other_user_id: otheruser[:other_user_id], username: user.username, image_url: user.avatar.url(:medium)}
      end
    end

    otherusersinfofiltered = []
    otherusersinfo.each do |otherusersinfo|
      if otherusersinfo[:user_id] != otherusersinfo[:other_user_id]
        otherusersinfofiltered << {user_id: otherusersinfo[:user_id], other_user_id: otherusersinfo[:other_user_id], username: otherusersinfo[:username], image_url: otherusersinfo[:image_url] }
      end
    end

    otherusersinfofiltered = otherusersinfofiltered.uniq{|x| x}

    render json: otherusersinfofiltered.to_json

  end

end
