class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.integer :user_id
      t.string :title
      t.string :location
      t.string :description
      t.string :packlist

      t.timestamps
    end
  end
end
