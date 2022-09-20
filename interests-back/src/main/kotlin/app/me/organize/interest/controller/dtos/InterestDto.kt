package app.me.organize.interest.controller.dtos


data class InterestDto(val id: String?,
                       val name: String,
                       val type: String,
                       val state: String,
                       val genres: List<String>,
                       val score: Int?,
                       val currently: Int?,
                       val total: Int,
                       val content: String?){

    fun validateAtCreation(): Boolean{
        return id==null &&
                name.isNotEmpty() &&
                type.isNotEmpty() &&
                state.isNotEmpty() &&
                genres.isNotEmpty() &&
                total > 0
    }
}