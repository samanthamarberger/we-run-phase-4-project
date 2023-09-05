class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :bio, :user_photo

  has_many :trails
end
