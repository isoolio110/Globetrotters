class User < ActiveRecord::Base
  # has_many :user_goals
  has_many :locations
  has_many :stories

  # Validations
  has_secure_password
  validates  :first_name, :last_name, :presence => :true
  validates :username, uniqueness: true
  validates_format_of :username, :with => /\A[a-zA-Z0-9]+\z/
  validates_format_of :first_name, :last_name, :with => /\A[a-zA-Z]+\z/
  validates :username, length: {minimum:4}
  validates :password, length: {minimum:6}

  # Paperclip
  has_attached_file :avatar, :styles => { :medium => "200x200#", :thumb => "100x100#" }, :default_url => "avatars/missing.jpg", :convert_options => {:thumb => '-set colorspace sRGB -strip', :medium => '-set colorspace sRGB -strip' }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  # Instance Methods

  def users_who_wrote_about_same_locations
    stories = []
    self.locations.each do |loc|
      stories_array = Story.where(location: loc.place)
      stories << stories_array if stories_array.length > 0
    end

    other_users = []
    stories.flatten.each do |story|
      other_users << story.user if story.user != self
    end

    other_users
  end

end
