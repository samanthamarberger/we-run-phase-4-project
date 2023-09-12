# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Removing in order to reseed
User.destroy_all
Trail.destroy_all
Review.destroy_all


user1 = User.create!(
  username: 'user1',
  email: 'user1@example.com',
  password: 'password',
  bio: 'I love trail running!',
  user_photo: 'user1.jpg'
)

user2 = User.create!(
  username: 'user2',
  email: 'user2@example.com',
  password: 'password',
  bio: 'Trail runner and nature enthusiast.',
  user_photo: 'user2.jpg'
)

# Create some trails
trail1 = Trail.create!(
  trail_name: 'Trail 1',
  description: 'A scenic trail with beautiful views.',
  location: 'Mountain Valley',
  difficulty: 3,
  trail_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBauby6zmXL1bokmt1M9ay3sIo9Fqdhsp8pSXvC6U&s'
)

trail2 = Trail.create!(
  trail_name: 'Trail 2',
  description: 'A challenging trail for experienced runners.',
  location: 'Forest Hills',
  difficulty: 5,
  trail_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMLD8NKSmi2c_UTIE4XI_3ZexOGYgUTUgfKQ&usqp=CAU'
)

# Create some reviews
Review.create!(
  username: user1.username,
  rating: 4,
  review: 'Great trail, loved the views!',
  trail: trail1,
  user: user1
)

Review.create!(
  username: user2.username,
  rating: 5,
  review: 'Tough trail but totally worth it!',
  trail: trail2,
  user: user2
)

puts 'Seed data created successfully!'
