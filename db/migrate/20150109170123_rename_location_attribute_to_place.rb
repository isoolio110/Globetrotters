class RenameLocationAttributeToPlace < ActiveRecord::Migration
  def change
    rename_column :locations, :location, :place
  end
end
