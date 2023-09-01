class TrailsController < ApplicationController
    before_action :authorize

    def index 
        render json: Trail.all, status: :ok
    end

    def create
    end

    def show
    end

    def destroy
    end
end
