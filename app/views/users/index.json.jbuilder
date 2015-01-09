json.array!(@users) do |user|
  json.extract! user, :id
  json.current_user = user == current_user ? 1 : 0
  json.extract! user, :username
  json.image_url = user.avatar.url(:medium)
  json.user_locations (user.user_locations)
  json.stories (user.stories)
end