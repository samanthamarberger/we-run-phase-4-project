class Review < ApplicationRecord
    belongs_to :user
    belongs_to :trail 

    validates :rating, presence: true, numericality: { greater_than: 0, less_than: 6 }
    validates :review, presence: true
end
