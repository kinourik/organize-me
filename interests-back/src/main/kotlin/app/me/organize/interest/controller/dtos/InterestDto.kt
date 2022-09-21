package app.me.organize.interest.controller.dtos


data class InterestDto(var id: String? = null,
                       var name: String? = null,
                       var type: String? = null,
                       var state: String? = null,
                       var genres: List<String>? = null,
                       var score: Int? = null,
                       var currently: Int? = null,
                       var total: Int? = null,
                       var content: String? = null){
}