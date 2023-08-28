class User < ApplicationRecord
    has_secure_password

    has_many :reviews
    has_many :trails, through: :reviews

    validates :username, :email, presence: true, uniqueness: true
    validates :password, presence: true
    # validates :password_confirmation, presence: true
end
