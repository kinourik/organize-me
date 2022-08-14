package app.me.organize.interest.repository

import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType
import app.me.organize.interest.repository.daos.InterestDao
import org.springframework.stereotype.Component
import kotlin.Comparator

@Component
class InterestRepository(val interestDao: InterestDao) {

    val ex: Interest = Interest(name = "Isekai Ojisan", type = InterestType.ANIME, state = InterestState.ONGOING, genres =  emptyList(), total = 12)

    fun findAndFilterInterests(name: String?, type: InterestType, state: InterestState, genres: List<String>?, scoreSort: String, totalSort: String): List<Interest> {
        val interests: List<Interest> = interestDao.findInterests()

        val filtersToApply: MutableList<(Interest) -> Boolean> = ListOperators.filtersByParameters(name, type, state, genres)
        val comparatorToApply: Comparator<Interest> = ListOperators.sortsByParameters(scoreSort, totalSort)

        return interests.filter{interest -> filtersToApply.all{ it(interest) }}
                .sortedWith( comparatorToApply)
    }

    fun findInterestById(id: String): Interest? {
        return interestDao.findInterestById(id)
    }

    fun createInterest(interest: Interest): String {
        return interestDao.createInterest(interest)
    }

    fun modifyInterest(interest: Interest){
        interestDao.modifyInterest(interest)
    }

    fun deleteInterest(id: String) {
        interestDao.deleteInterest(id)
    }

}