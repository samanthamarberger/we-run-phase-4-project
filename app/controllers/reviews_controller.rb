class ReviewsController < ApplicationController
    # before_action :authorize

    def create
        review = current_user.reviews.create(review_params)
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
        params.permit(:rating, :review)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
