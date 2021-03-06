class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.integer :ordinal
      t.string :name
      t.string :description
      t.float :lat
      t.float :lng
      t.datetime :announced_at
      t.timestamps null: false
    end
  end
end
