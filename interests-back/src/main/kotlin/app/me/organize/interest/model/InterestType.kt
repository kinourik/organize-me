package app.me.organize.interest.model

enum class InterestType {
    ANIME, MANGA, BOOKS, GAMES, MOVIES, PLAYLIST, SERIES, NONE, ALL;

    companion object {
        fun getType(valueType: String): InterestType {
            return try {
                InterestType.valueOf(valueType)
            } catch (e: IllegalArgumentException) {
                NONE
            }
        }
    }
}