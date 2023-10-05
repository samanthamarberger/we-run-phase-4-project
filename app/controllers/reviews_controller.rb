class ReviewsController < ApplicationController

    def index 
        trail = current_trail

        if trail
            reviews = trail.reviews
            render json: reviews, status: :ok
          else
            render json: { error: 'Trail not found' }, status: :not_found
          end
    end

    def show
        review = current_trail.reviews.find_by(id: params[:id]) 
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
        review = current_trail.reviews.find_by(id: params[:id]) 
        if review.valid?
            if review.user.username == current_user.username
                review.update(review_params)
                if review.valid?
                    render json: review, status: :accepted
                else
                    render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
                end
            else
                render json: { error: 'You do not have permission to update this review' }, status: :unauthorized
            end
        else
            render json: { error: 'Review not found' }, status: :not_found
        end
    end

    def destroy
        review = current_trail.reviews.find_by(id: params[:id])
        if review.user.username == current_user.username
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

    def current_trail
        Trail.find_by(id: params[:trail_id])
    end

    def review_params
        params.permit(:rating, :review, :trail_id)
    end
end
