class CreateTrails < ActiveRecord::Migration[6.1]
  def change
    create_table :trails do |t|

      t.timestamps
    end
  end
end
