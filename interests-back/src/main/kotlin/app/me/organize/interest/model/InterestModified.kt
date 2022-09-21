package app.me.organize.interest.model


data class InterestModified(var id: String? = null,
                            var state: InterestState? = null,
                            var genres: List<Genre> = listOf(),
                            var score: Int? = null,
                            var currently: Int? = null,
                            var total: Int? = null,
                            var content: String? = null){

    fun valid(): Boolean{
        var isValid: Boolean = id?.isNotEmpty()?:false
        if (state!=null) isValid = isValid && state!= InterestState.ALL && state!= InterestState.NONE
        if (score!=null)  isValid = isValid && (score ?: 0) >= 1 && (score ?: 0) <= 10
        if (currently!=null) isValid = isValid && (currently ?: 0) >= 0
        if (total!=null) isValid = isValid && (total ?: 0) > 0
        if (content!=null) isValid = isValid && content?.isNotEmpty()?: true
        return  isValid
    }
}