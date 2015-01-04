class CreateOtherUsers < ActiveRecord::Migration
  def change
    create_table :other_users do |t|
      t.integer :user_id
      t.string :location
      t.integer :other_user_id

      t.timestamps
    end
  end
end
