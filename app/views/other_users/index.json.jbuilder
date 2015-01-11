
if @other_users.length > 0
  json.array! (@other_users) do |user|
    json.extract! user, :id
    json.extract! user, :username
    json.image_url user.avatar.url(:medium)
  end
else
  json.array! []
end
