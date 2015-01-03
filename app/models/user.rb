class User < ActiveRecord::Base
  # Paperclip
  has_attached_file :avatar, :styles => { :medium => "200x200#", :thumb => "100x100#" }, :default_url => "avatars/missing.jpg", :convert_options => {:thumb => '-set colorspace sRGB -strip', :medium => '-set colorspace sRGB -strip' }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

end
