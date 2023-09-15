class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :review, :trail_id, :user_id , :username

  # Make custom username method and remove username from migration in review

  def username
    object.user.username
  end

  belongs_to :user
  belongs_to :trail
end
