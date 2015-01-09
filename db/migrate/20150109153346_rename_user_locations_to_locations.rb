class RenameUserLocationsToLocations < ActiveRecord::Migration
  def self.up
    rename_table :user_locations, :locations
  end

  def self.down
    rename_table :locations, :user_locations
  end
end
