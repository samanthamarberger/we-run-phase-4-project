class TrailSerializer < ActiveModel::Serializer
  attributes :id, :trail_name, :description, :location, :difficulty, :trail_image

  has_many :reviews
  has_many :users
end
