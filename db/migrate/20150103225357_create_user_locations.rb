class CreateUserLocations < ActiveRecord::Migration
  def change
    create_table :user_locations do |t|
      t.integer :user_id
      t.string :location
      t.date :planned_date
      t.date :visited_date

      t.timestamps
    end
  end
end
