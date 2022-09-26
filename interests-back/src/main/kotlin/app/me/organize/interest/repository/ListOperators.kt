package app.me.organize.interest.repository

import app.me.organize.interest.model.Genre
import app.me.organize.interest.model.Interest
import app.me.organize.interest.model.InterestState
import app.me.organize.interest.model.InterestType

class ListOperators {

    companion object{
        fun filtersByParameters(name: String?,
                                types: List<InterestType>,
                                states: List<InterestState>,
                                genres: List<Genre>): MutableList<(Interest) -> Boolean> {
            val filtersToApply: MutableList<(Interest) -> Boolean> = mutableListOf()

            if(name != null){
                filtersToApply.add { interest ->
                    interest.name.contains(name, ignoreCase = true)
                }
                // We want to prioritize by name, so there is no more filters to apply
                return filtersToApply
            }

            if(types.isNotEmpty()){
                filtersToApply.add { interest ->
                    types.filter { it != InterestType.ALL }.any { interest.type == it}
                }
            }

            if (states.isNotEmpty()){
                filtersToApply.add { interest ->
                    states.filter { it != InterestState.ALL }.any { it == interest.state }
                }
            }
            if(genres.isNotEmpty()){
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