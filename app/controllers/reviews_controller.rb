class ReviewsController < ApplicationController

    def index 
        reviews = current_user.reviews.all
        render json: reviews, status: :ok
    end

    def show
        review = current_user.reviews.find_by(id: params[:id]) 
        if review
            render json: review, status: :ok
        else
            render json: {error: "Not found"}, status: :not_found
        end
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
        review = current_user.reviews.find_by(id: params[:id]) 
         if review.valid?
            if review.username == current_user.username
                review.update(review_params)
                if review.valid?
                    render json: review, status: :accepted
                else
                    render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
                end
            else
                render json: { error: 'You do not have permission to update this review'}, status: :unauthorized
            end
        else
            render json: { error: 'Review not found' }, status: :not_found
        end
    end

    def destroy
    end

    private
    
    def current_user 
        User.find_by(id: session[:user_id])
    end

    def current_trail
        Trail.find_by(id: params[:id])
    end

    def review_params
        params.permit(:rating, :review, :trail_id)
    end
end
