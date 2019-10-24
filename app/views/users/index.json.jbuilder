json.array! @users do |user|
  json.name  users.name
  json.id  user.id
end