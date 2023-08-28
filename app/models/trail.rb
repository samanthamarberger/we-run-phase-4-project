class Trail < ApplicationRecord

    has_many :reviews
    has_many :users, through: :reviews

    validates :trail_name, :location, presence: true
    validates :difficulty, presence: true, numericality: { greater_than: 0, less_than: 6 }
end
