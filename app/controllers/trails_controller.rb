class TrailsController < ApplicationController

    #make these based off of the TRAILS not the user because they are available to all to see
    def index 
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

    def trail_params
        params.permit(:trail_name, :description, :location, :difficulty, :trail_image)
    end

    def update_trail_params
        params.permit(:description)
    end
end
