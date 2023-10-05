class TrailsController < ApplicationController
    before_action :authorize

    #make these based off of the TRAILS not the user because they are available to all to see
    def index 
        #byebug
        trails = Trail.all
        render json: trails, status: :ok
    end

    def create
        trail = Trail.create(trail_params)
        if trail.valid?
            render json: trail, status: :created
        else
            render json: { errors: trail.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        trail = Trail.find_by(id: params[:id])
        if trail
            render json: trail, status: :ok
        else
            render json: { error: "Trail not found" }, status: :not_found
        end
    end

    def update
        trail = Trail.find_by(id: params[:id])
        trail.update(update_trail_params)
        if trail.valid?
            render json: trail, status: :accepted
        else
            render json: { errors: trail.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        trail = Trail.find_by(id: params[:id])
        if trail
            trail.destroy
            head :no_content
        else
            render json: { error: "Trail not found" }, status: :not_found
        end
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def trail_params
        params.permit(:trail_name, :description, :location, :difficulty, :trail_image)
    end

    def update_trail_params
        params.permit(:description)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
