package app.me.organize.interest.service

import app.me.organize.interest.model.*
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

    fun modifyInterest(interestModified: InterestModified) {
        if(!interestModified.valid()) throw IllegalStateException("Interest invalid")
        if(interestModified.genres.any { !genreDao.existsById(it.name) } ) throw IllegalStateException("Interest invalid: genre does not exists")
        val interest = interestRepository.findInterestById(interestModified.id ?: "not an id").apply {
            genres = interestModified.genres.ifEmpty { genres }
            score = interestModified.score ?: score
            total = interestModified.total ?: total
            content = interestModified.content ?: content
        }
        if(interestModified.state != null) {
            interest.apply {state = interestModified.state ?: state}
            if(interestModified.state==InterestState.COMPLETED) interest.apply { currently = total }
        }
        if(interestModified.currently != null) {
            interest.apply {currently = interestModified.currently ?: currently}
            if(interestModified.currently==interest.total) interest.apply { state = InterestState.COMPLETED }
        }

        interestRepository.modifyInterest(interest)
    }

    fun deleteInterest(id: String){
        interestRepository.deleteInterest(id)
    }

}