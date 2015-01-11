json.array! (@locations) do |location|
  json.extract! location, :place
  json.planned_date format_date(location.planned_date) if location.planned_date
  json.visited_date format_date(location.visited_date) if location.visited_date
end
