package app.me.organize.interest.controller

import app.me.organize.interest.model.Genre
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType
import app.me.organize.interest.repository.GenreRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/interests")
class InterestCategoriesController(val genreRepository: GenreRepository) {

    @GetMapping("/states")
    fun getStates(): ResponseEntity<List<String>> {
        return ResponseEntity.accepted().body(
                InterestState.values()
                        .filter { it!= InterestState.NONE && it!= InterestState.ALL }
                        .map { it.toString() }
        )
    }

    @GetMapping("/types")
    fun getTypes(): ResponseEntity<List<String>> {
        return ResponseEntity.accepted().body(
                InterestType.values()
                        .filter { it!= InterestType.NONE && it!= InterestType.ALL }
                        .map { it.toString() }
        )
    }

    @GetMapping("/genres")
    fun getGenres(): ResponseEntity<List<String>> {
        return ResponseEntity.accepted().body(
                genreRepository.getGenres()
                        .map { it.toString() }
        )
    }
    @PostMapping("/genres")
    fun <T> createGenre(@RequestBody genre: Genre): ResponseEntity<T> {
        genreRepository.createGenre()
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @DeleteMapping("/genres")
    fun <T> deleteGenre(@RequestBody genre: Genre): ResponseEntity<T> {
        genreRepository.deleteGenre()
        return ResponseEntity.ok().build()
    }
}