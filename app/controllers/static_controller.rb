class StaticController < ApplicationController

  skip_before_action :authenticate, only: [:home, :press]

  def home
    render :home, layout: false
  end

  def about
  end

  def cities
  end

  def self_sufficiency
  end

  def join
  end

  def contact
  end

  def globe
    @cities = City.order(ordinal: :asc)
  end

  def map
    @cities = City.order(ordinal: :asc)
  end

  def press
    render text: 'ok', status: :ok
  end
end
