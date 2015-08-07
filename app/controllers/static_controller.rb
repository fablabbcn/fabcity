class StaticController < ApplicationController
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
end
