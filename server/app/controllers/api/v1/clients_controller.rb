# app/controllers/api/v1/clients_controller.rb

module Api
  module V1
    class ClientsController < ApplicationController
      before_action :set_client, only: [:show, :update, :destroy]

      # GET /api/v1/clients
      def index
        @clients = Client.all
        render json: @clients
      end

      # GET /api/v1/clients/1
      def show
        render json: @client
      end

      # POST /api/v1/clients
      def create
        @client = Client.new(client_params)

        if @client.save
          render json: @client, status: :created
        else
          render json: @client.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/clients/1
      def update
        if @client.update(client_params)
          render json: @client
        else
          render json: @client.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/clients/1
      def destroy
        @client.destroy
      end

      private

      def set_client
        @client = Client.find(params[:id])
      end

      def client_params
        params.require(:client).permit(:company_name, :cnpj, :opening_date, :address)
      end
    end
  end
end
