package app.me.organize.interest.repository

import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType
import app.me.organize.interest.repository.daos.InterestDao
import org.springframework.stereotype.Component
import java.util.UUID
import kotlin.Comparator

@Component
class InterestRepository(val interestDao: InterestDao) {


    fun findAndFilterInterests(name: String?, type: InterestType, state: InterestState, genres: List<String>?, scoreSort: String, totalSort: String): List<Interest> {
        val interests: List<Interest> = interestDao.findAll()

        val filtersToApply: MutableList<(Interest) -> Boolean> = ListOperators.filtersByParameters(name, type, state, genres)
        val comparatorToApply: Comparator<Interest> = ListOperators.sortsByParameters(scoreSort, totalSort)

        return interests.filter{interest -> filtersToApply.all{ it(interest) }}
                .sortedWith( comparatorToApply)
    }

    fun findInterestById(id: String): Interest {
        return interestDao.findById(id)
            .orElseThrow{
                IllegalStateException("Interest not found")
            }
    }

    fun createInterest(interest: Interest): String? {
        interest.id = UUID.randomUUID().toString()
        interestDao.insert(interest)
        return interest.id
    }

    fun modifyInterest(interest: Interest){
        findInterestById(interest.id?:"not an id")
        interestDao.save(interest)
    }

    fun deleteInterest(id: String) {
        findInterestById(id)
        interestDao.deleteById(id)
    }

}