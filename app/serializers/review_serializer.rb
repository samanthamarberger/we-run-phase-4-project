class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :username, :rating, :review, :trail_id, :user_id

  #Make custom username method and remove username from migration in review

  def username
    byebug
  end

  belongs_to :user
  belongs_to :trail
end
