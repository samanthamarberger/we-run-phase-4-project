class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

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
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        user.update(update_user_params)
        if user.valid?
            render json: user, status: :accepted
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end     
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            user.reviews.destroy_all
            user.destroy
            head :no_content
        else
            render json: { error: "User not found" }, status: :not_found
        end
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :bio, :user_photo)
    end

    def update_user_params
        params.permit(:username, :email, :bio, :user_photo)
    end

end
