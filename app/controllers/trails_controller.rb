class TrailsController < ApplicationController
    before_action :authorize

    def index 
        trails = current_user.trails
        render json: trails, status: :ok
    end

    def create
        trail = current_user.trails.create(trail_params)
        if trail.valid?
            render json: trail, status: :created
        else
            render json: { errors: trail.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        trail = current_user.trails.find_by(id: params[:id])
        if trail
            render json: trail, status: :ok
        else
            render json: { errors: "Not found" }, status: :unauthorized
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

    def trail_params
        params.permit(:trail_name, :description, :location, :difficulty, :trail_image)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
