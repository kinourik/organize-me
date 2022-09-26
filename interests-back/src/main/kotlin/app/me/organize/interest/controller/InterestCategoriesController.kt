package app.me.organize.interest.controller

import app.me.organize.interest.model.Genre
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType
import app.me.organize.interest.repository.daos.GenreDao
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/interests")
@CrossOrigin(origins = ["http://localhost:3000"])
class InterestCategoriesController(val genreDao: GenreDao) {

    @GetMapping("/states")
    fun getStates(): ResponseEntity<List<String>> {
        return ResponseEntity.accepted().body(
                InterestState.values()
                        .filter { it!= InterestState.NONE && it!= InterestState.ALL }
                        .map { it.toString().lowercase().replaceFirstChar{ char -> char.uppercase() } }
        )
    }

    @GetMapping("/types")
    fun getTypes(): ResponseEntity<List<String>> {
        return ResponseEntity.accepted().body(
                InterestType.values()
                    .filter { it!= InterestType.NONE && it!= InterestType.ALL }
                    .map { it.toString().lowercase().replaceFirstChar{ char -> char.uppercase() } }
        )
    }

    @GetMapping("/genres")
    fun getGenres(): ResponseEntity<List<String>> {
        return ResponseEntity.accepted().body(
                genreDao.findAll()
                    .map { it.name.lowercase().replaceFirstChar{ char -> char.uppercase() } }
        )
    }
    @PostMapping("/genres")
    fun <T> createGenre(@RequestBody genre: Genre): ResponseEntity<T> {
        genreDao.save(Genre(name = genre.name.uppercase()))
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @DeleteMapping("/genres")
    fun <T> deleteGenre(@RequestBody genre: Genre): ResponseEntity<T> {
        genreDao.deleteById(genre.name.uppercase())
        return ResponseEntity.ok().build()
    }
}