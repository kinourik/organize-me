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
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.lang.IllegalStateException


@RestController
@RequestMapping("/interests")
class InterestController (val interestService: InterestService){

    @GetMapping
    fun getInterests(
            @RequestParam(required=false) name: String?,
            @RequestParam(required=false) type: String?,
            @RequestParam(required=false) state: String?,
            @RequestParam(required=false) genres: List<String>?,
            @RequestParam(required=false) scoreSort: String?,
            @RequestParam(required=false) totalSort: String?
    ): ResponseEntity<List<Interest>> {
        val interests = try { interestService.findAndFilterInterests(
                name,
                InterestType.getType((type ?: "ALL").uppercase()),
                InterestState.getState((state ?: "ALL").uppercase()),
                genres?.map { Genre(it.uppercase())},
                scoreSort,
                totalSort)
        } catch (exception : IllegalStateException){
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.accepted().body(interests)
    }

    @PostMapping
    fun createInterest(@RequestBody interestDto: InterestDto): ResponseEntity<IdDto>{
        return try {
            if(!interestDto.validateAtCreation()){
                return ResponseEntity.badRequest().build()
            }
            ResponseEntity
                .accepted()
                .body(IdDto(
                    interestService.createInterest(
                        InterestDtoMapper.mapFromDto(interestDto)
                    )
                ))
        }catch (illegalStateException: IllegalStateException ){
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("/{id}")
    fun getInterest(@PathVariable id: String): ResponseEntity<Interest>{
        return try {
            ResponseEntity.accepted().body(interestService.findInterestById(id))
        }catch (illegalStateException: IllegalStateException){
            ResponseEntity.badRequest().build()
        }
    }

    @PutMapping("/{id}")
    fun <T> modifyInterest(@PathVariable id: String, @RequestBody interest: Interest): ResponseEntity<T>{
        return try {
            interestService.modifyInterest(interest)
            ResponseEntity.accepted().build()
        }catch (illegalStateException: IllegalStateException){
            ResponseEntity.badRequest().build()
        }

    }

    @DeleteMapping("/{id}")
    fun <T> deleteInterest(@PathVariable id: String): ResponseEntity<T>{
        return try {
            interestService.deleteInterest(id)
            ResponseEntity.ok().build()
        }catch (illegalStateException: IllegalStateException){
            ResponseEntity.badRequest().build()
        }
    }
}