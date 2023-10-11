class ReviewsController < ApplicationController

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
        if review
            review.update(review_params)
            if review.valid?
                render json: review, status: :accepted
            else
                render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { error: 'You do not have permission to update this review' }, status: :unauthorized
        end
    end

    def destroy
        review = current_user.reviews.find_by(id: params[:id])
        if review
            review.destroy
            head :no_content
        else 
            render json: { error: 'You do not have permission to delete this review' }, status: :unauthorized
        end
    end


    private
    
    def current_user 
        User.find_by(id: session[:user_id])
    end

    def review_params
        params.permit(:rating, :review, :trail_id)
    end
end
