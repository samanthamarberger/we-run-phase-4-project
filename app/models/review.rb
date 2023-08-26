class Review < ApplicationRecord
    belongs_to :user
    belongs_to :trail 

    validates :rating, presence: true, :greater_than: {0}, :less_than: {6}
    
end
