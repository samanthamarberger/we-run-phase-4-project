class ReviewsController < ApplicationController
    before_action :authorize

    def index 
        reviews = current_user.reviews
        render json: reviews, status: :ok
    end

    def create
    end

    def show
    end

    def update
    end

    def destroy
    end

    private
    
    def current_user 
        User.find_by(id: session[:user_id])
    end

    def review_params
        params.permit(:username, :rating, :review)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
