package app.me.organize.interest.controller

import app.me.organize.interest.controller.dtos.IdDto
import app.me.organize.interest.controller.dtos.InterestDto
import app.me.organize.interest.controller.dtos.InterestDtoMapper
import app.me.organize.interest.model.Genre
import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType
import app.me.organize.interest.service.InterestService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.lang.IllegalStateException
import java.util.logging.Logger


@RestController
@RequestMapping("/interests")
@CrossOrigin(origins = ["http://localhost:3000"])
class InterestController (val interestService: InterestService){
    @GetMapping
    fun getInterests(
            @RequestParam(required=false) name: String?,
            @RequestParam(required=false) types: List<String>?,
            @RequestParam(required=false) states: List<String>?,
            @RequestParam(required=false) genres: List<String>?,
            @RequestParam(required=false) scoreSort: String?,
            @RequestParam(required=false) totalSort: String?
    ): ResponseEntity<List<InterestDto>> {
        val interests = interestService.findAndFilterInterests(
                name,
                (types?: listOf()).filter{ it.uppercase() != "ALL"}.map { InterestType.getType(it.uppercase()) },
                (states?: listOf()).filter{ it.uppercase() != "ALL"}.map { InterestState.getState(it.uppercase()) },
                (genres?: listOf()).filter{ it.uppercase() != "ALL"}.map { Genre(it.uppercase())},
                scoreSort,
                totalSort).map { InterestDtoMapper.mapFromInterestToDto(it) }
        return ResponseEntity.accepted().body(interests)
    }

    @PostMapping
    fun createInterest(@RequestBody interestDto: InterestDto): ResponseEntity<IdDto>{
        return ResponseEntity
                .accepted()
                .body(IdDto(
                    interestService.createInterest(
                        InterestDtoMapper.mapFromDtoToInterest(interestDto)
                    )
                ))
    }

    @GetMapping("/{id}")
    fun getInterest(@PathVariable id: String): ResponseEntity<InterestDto>{
        return ResponseEntity.accepted()
            .body(InterestDtoMapper.mapFromInterestToDto(
                interestService.findInterestById(id)
            ))
    }

    @PutMapping("/{id}")
    fun <T> modifyInterest(@PathVariable id: String, @RequestBody interest: InterestDto): ResponseEntity<T>{
        if(interest.name != null) throw IllegalStateException("You cannot change the name")
        if(interest.id != null) throw IllegalStateException("You cannot change the id")
        if(interest.type != null) throw IllegalStateException("You cannot change the type")
        interestService.modifyInterest(InterestDtoMapper.mapFromDtoToInterestModified(interest, id))
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/{id}")
    fun <T> deleteInterest(@PathVariable id: String): ResponseEntity<T>{
        interestService.deleteInterest(id)
        return ResponseEntity.ok().build()
    }
}