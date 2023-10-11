class User < ApplicationRecord
    has_secure_password

    has_many :reviews
    has_many :trails, -> { distinct }, through: :reviews

    validates :username, :email, presence: true, uniqueness: true
    validates :password, presence: :true, if: :password_required?

    def password_required?
        password.present? || password_confirmation.present?
    end
end
