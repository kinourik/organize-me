package app.me.organize.interest.repository

import app.me.organize.interest.model.Genre
import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType

class ListOperators {

    companion object{
        fun filtersByParameters(name: String?,
                                type: InterestType,
                                state: InterestState,
                                genres: List<Genre>?): MutableList<(Interest) -> Boolean> {
            val filtersToApply: MutableList<(Interest) -> Boolean> = mutableListOf()

            if(name != null){
                filtersToApply.add { interest ->
                    interest.name.contains(name, ignoreCase = true)
                }
                // We want to prioritize by name, so there is no more filters to apply
                return filtersToApply
            }

            if(type != InterestType.ALL && type != InterestType.NONE){
                filtersToApply.add { interest ->
                    interest.type == type
                }
            }

            if(state != InterestState.ALL && state != InterestState.NONE){
                filtersToApply.add { interest ->
                    interest.state == state
                }
            }

            if(genres != null){
                filtersToApply.add { interest ->
                    genres.map { it.name } .toSet()
                            .intersect(interest.genres.map { it.name }.toSet())
                            .any()
                }
            }
            return filtersToApply
        }

        fun sortsByParameters(scoreSort: String, totalSort: String): Comparator<Interest> {
            var comparator: Comparator<Interest> = compareBy<Interest> {it.state.priority}
                    .thenBy { it.type.toString() }
                    .thenBy { it.name }

            comparator = when(scoreSort){
                "ASC" -> comparator.thenBy { it.score }
                else -> comparator.thenByDescending { it.score } // we want that sorts the best scoring interests by default
            }

            comparator = when(totalSort){
                "ASC" -> comparator.thenBy { it.total }
                "DES" -> comparator.thenByDescending { it.total }
                else -> comparator
            }

            return comparator
        }
    }
}