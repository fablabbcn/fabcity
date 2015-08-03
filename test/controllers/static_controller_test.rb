require 'test_helper'

class StaticControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get about" do
    get :about
    assert_response :success
  end

  test "should get cities" do
    get :cities
    assert_response :success
  end

  test "should get self_sufficiency" do
    get :self_sufficiency
    assert_response :success
  end

  test "should get join" do
    get :join
    assert_response :success
  end

  test "should get contact" do
    get :contact
    assert_response :success
  end

end
