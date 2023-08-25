class CreateTrails < ActiveRecord::Migration[6.1]
  def change
    create_table :trails do |t|
      t.string :trail_name
      t.string :description
      t.string :location
      t.integer :difficulty
      t.string :trail_image


      t.timestamps
    end
  end
end
