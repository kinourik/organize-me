package app.me.organize.interest.service

import app.me.organize.interest.model.Genre
import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType
import app.me.organize.interest.repository.InterestRepository
import app.me.organize.interest.repository.daos.GenreDao
import org.springframework.stereotype.Service

@Service
class InterestService (val interestRepository: InterestRepository, val genreDao: GenreDao) {

    fun findAndFilterInterests(
        name: String?,
        type: InterestType,
        state: InterestState,
        genres: List<Genre>?,
        scoreSort: String?,
        totalSort: String?
    ): List<Interest>{
        if (type == InterestType.NONE) throw IllegalStateException("Type not valid")
        if (state == InterestState.NONE) throw IllegalStateException("State not valid")
        return interestRepository.findAndFilterInterests(
                name,
                type,
                state,
                genres,
                scoreSort?: "NONE",
                totalSort?: "NONE")
    }

    fun findInterestById(id: String): Interest {
        return interestRepository.findInterestById(id)
    }

    fun createInterest(interest: Interest): String{
        if(!interest.valid()) throw IllegalStateException("Interest invalid")
        if(interest.genres.any { !genreDao.existsById(it.name) }) throw IllegalStateException("Interest invalid: genre does not exists")
        return interestRepository.createInterest(interest)?: throw IllegalStateException("Interest cannot be created")
    }

    fun modifyInterest(interest: Interest) {
        interestRepository.modifyInterest(interest)
    }

    fun deleteInterest(id: String){
        interestRepository.deleteInterest(id)
    }

}