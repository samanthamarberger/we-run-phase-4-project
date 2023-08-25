class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :username, :rating, :review, :trail_id, :user_id

  belongs_to :users
  belongs_to :trails
end
