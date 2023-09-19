class ReviewsController < ApplicationController

    def index 
        reviews = current_user.reviews.all
        render json: reviews, status: :ok
    end

    def create
        review = current_user.reviews.create(review_params)
        review.trail_id = (review_params[:trail_id])
        if review.valid?
            render json: review, status: :created
        else
            render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
        end
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
        params.permit(:rating, :review, :trail_id)
    end
end
