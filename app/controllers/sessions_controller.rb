class SessionsController < ApplicationController

    #login
    def create
        
    end

    #logout
    def destroy
        session.clear  
    end

end
