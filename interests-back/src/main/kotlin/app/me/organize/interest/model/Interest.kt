package app.me.organize.interest.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Interest(@Id var id: String? = null,
                    var name: String = "",
                    var type: InterestType = InterestType.NONE,
                    var state: InterestState = InterestState.NONE,
                    var genres: List<Genre> = listOf(),
                    var score: Int? = null,
                    var currently: Int? = null,
                    var total: Int? = 0,
                    var content: String? = "") {
    fun valid(): Boolean{
        return name.isNotEmpty() &&
                type != InterestType.ALL && type != InterestType.NONE &&
                state != InterestState.ALL && state != InterestState.NONE &&
                genres.isNotEmpty() && (total?:1) > 0 && (currently ?: 0) >= 0
    }
}
