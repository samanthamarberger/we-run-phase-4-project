class UsersController < ApplicationController

    #signup
    def create 
    end

    def show
        user = User.find_by(id: sessions[:user_id])
        render json: user
    end

end
