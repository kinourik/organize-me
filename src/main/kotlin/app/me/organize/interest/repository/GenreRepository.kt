package app.me.organize.interest.repository

import app.me.organize.interest.model.Genre
import org.springframework.stereotype.Component

@Component
class GenreRepository {
    fun getGenres(): List<Genre> {
        return emptyList();
    }

    fun createGenre() {
        TODO("Not yet implemented")
    }

    fun deleteGenre() {
        TODO("Not yet implemented")
    }
}