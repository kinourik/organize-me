package app.me.organize.interest.controller.dtos

import app.me.organize.interest.model.Genre
import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType

class InterestDtoMapper {
    companion object{
        fun mapFromDto(interestDto: InterestDto): Interest {

            return Interest().apply {
                id = interestDto.id;
                name = interestDto.name;
                type = InterestType.getType(interestDto.type);
                state = InterestState.getState(interestDto.state);
                genres = interestDto.genres.map { Genre(it) };
                score = interestDto.score;
                currently = interestDto.currently;
                total = interestDto.total;
                content = interestDto.content;
            }
        }
    }
}