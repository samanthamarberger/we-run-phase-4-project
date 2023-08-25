class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password, :password_confirmation, :bio, :user_photo

  has_many :reviews
  has_many :trails, through: :reviews
end
