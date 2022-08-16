package app.me.organize.interest.repository.daos

import app.me.organize.interest.model.Genre
import org.springframework.data.mongodb.repository.MongoRepository

interface GenreDao: MongoRepository<Genre,String> {
}