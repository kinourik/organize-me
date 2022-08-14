package app.me.organize.interest.model

enum class InterestState(val priority: Int) {
    ONGOING(0),
    NEARBY(1),
    PENDING(2),
    COMPLETED(3),
    ALL(4),
    NONE(5);

    companion object{
        fun getState(valueState: String): InterestState{
            return try {
                InterestState.valueOf(valueState)
            } catch(e: IllegalArgumentException) {
                NONE
            }
        }
    }
}