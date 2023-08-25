class UsersController < ApplicationController

    #signup
    def create 
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity 
        end
    end

    def show
        user = User.find_by(id: sessions[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {errors: "Not Authorized"}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :bio, :user_photo)
    end

end
