class ReviewsController < ApplicationController
    # before_action :authorize

    # no need for index or show 
    def index 
        reviews = current_user.reviews
        render json: reviews, status: :ok
    end

    def create
        review = current_user.reviews.create(review_params)
        if review.valid?
            render json: review, status: :created
        else
            render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
        end
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
        params.permit(:rating, :review)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
