package app.me.organize.interest.model

data class Interest(var id: String? = null,
                    val name: String = "",
                    val type: InterestType = InterestType.ALL,
                    var state: InterestState = InterestState.ALL,
                    val genres: List<String> = mutableListOf(),
                    var score: Int? = null,
                    var currently: Int? = null,
                    var total: Int? = 0,
                    var content: String? = null) {
    fun valid(): Boolean{
        return  id != null &&
                name.isNotEmpty() &&
                type!= InterestType.ALL && type!= InterestType.NONE &&
                state!= InterestState.ALL && state!= InterestState.NONE &&
                genres.isNotEmpty()
    }
}
