# app/models/client.rb
class Client < ApplicationRecord
  validates :cnpj, presence: true, format: { with: /\A\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\z/, message: "deve estar no formato XX.XXX.XXX/XXXX-XX" }
  validate :opening_date_not_in_future
  validate :valid_cnpj
  validates :cnpj, uniqueness: true

  private

  def opening_date_not_in_future
    return if opening_date.blank?

    if opening_date > Date.today
      errors.add(:opening_date, "não pode ser no futuro")
    end
  end

  def valid_cnpj
    return if cnpj.blank?

    unless CPF.valid?(cnpj) || CNPJ.valid?(cnpj)
      errors.add(:cnpj, "não é válido")
    end
  end

 

end
