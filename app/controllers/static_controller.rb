class StaticController < ApplicationController

  skip_before_action :authenticate, only: :press
  def home
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
