package app.me.organize.interest.repository.daos

import app.me.organize.interest.model.Interest
import org.springframework.data.mongodb.repository.MongoRepository

interface InterestDao: MongoRepository<Interest, String> {
}