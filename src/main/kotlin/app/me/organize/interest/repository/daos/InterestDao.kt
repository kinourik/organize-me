package app.me.organize.interest.repository.daos

import app.me.organize.interest.model.Interest

interface InterestDao {
    fun findInterests(): List<Interest>

    fun findInterestById(id: String): Interest?

    fun createInterest(interest: Interest): String

    fun modifyInterest(interest: Interest)

    fun deleteInterest(id: String)
}