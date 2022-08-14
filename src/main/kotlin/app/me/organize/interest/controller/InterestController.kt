package app.me.organize.interest.controller

import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType
import app.me.organize.interest.service.InterestService
import org.springframework.http.HttpStatus
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
                genres?.map { it.uppercase() },
                scoreSort,
                totalSort)
        } catch (exception : IllegalStateException){
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.accepted().body(interests)
    }

    @PostMapping
    fun createInterest(@RequestBody interest: Interest): ResponseEntity<String>{
        return ResponseEntity.accepted().body(interestService.createInterest(interest))
    }

    @GetMapping("/{id}")
    fun getInterest(@PathVariable id: String): ResponseEntity<Interest>{
        return ResponseEntity.accepted().body(interestService.findInterestById(id))
    }

    @PutMapping("/{id}")
    fun modifyInterest(@PathVariable id: String, @RequestBody interest: Interest): ResponseEntity<String>{
        if(interest.id != id) return ResponseEntity("The ep-id is different from the interest.id", HttpStatus.BAD_REQUEST)
        interestService.modifyInterest(interest)
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/{id}")
    fun <T> deleteInterest(@PathVariable id: String): ResponseEntity<T>{
        interestService.deleteInterest(id)
        return ResponseEntity.ok().build()
    }

}