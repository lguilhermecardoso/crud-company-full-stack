class CreateClients < ActiveRecord::Migration[6.1]
  def change
    create_table :clients do |t|
      t.string :company_name
      t.string :cnpj
      t.date :opening_date
      t.string :address

      t.timestamps
    end
  end
end
