class CreateMostPopularDestinations < ActiveRecord::Migration
  def change
    create_table :most_popular_destinations do |t|
      t.string :destination
      t.integer :num_of_visitors

      t.timestamps
    end
  end
end
