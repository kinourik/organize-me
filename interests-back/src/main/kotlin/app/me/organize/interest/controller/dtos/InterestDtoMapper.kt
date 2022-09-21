package app.me.organize.interest.controller.dtos

import app.me.organize.interest.model.*

class InterestDtoMapper {
    companion object{

        fun mapFromInterestToDto(interest: Interest): InterestDto{
            return InterestDto().apply {
                id = interest.id
                name = interest.name
                type = interest.type.name
                state = interest.state.name
                genres = interest.genres.map { it.name }
                score = interest.score
                currently = interest.currently
                total = interest.total
                content = interest.content
            }

        }
        fun mapFromDtoToInterest(interestDto: InterestDto): Interest {

            return Interest().apply {
                id = interestDto.id
                name = interestDto.name?:""
                type = InterestType.getType(interestDto.type?:"")
                state = InterestState.getState(interestDto.state?:"")
                genres = interestDto.genres?.map { Genre(it) }?: listOf()
                score = interestDto.score
                currently = interestDto.currently
                total = interestDto.total?:0
                content = interestDto.content
            }
        }

        fun mapFromDtoToInterestModified(interestDto: InterestDto, interestId: String ): InterestModified {
            val interestModified = InterestModified().apply{
                id = interestId
                score = interestDto.score
                currently = interestDto.currently
                total = interestDto.total
                content = interestDto.content
            }
            if(interestDto.state!=null){
                interestModified.apply {
                    state = InterestState.getState(interestDto.state?:"")
                }
            }
            if(interestDto.genres!=null){
                interestModified.apply {
                    genres = interestDto.genres?.map{ Genre(it) }?: listOf()
                }
            }

            return interestModified

        }
    }
}