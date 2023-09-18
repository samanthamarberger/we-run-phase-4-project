class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :review, :trail_id, :user_id , :username

  def username
    object.user.username
  end

  belongs_to :user
  belongs_to :trail
end
