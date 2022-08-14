package app.me.organize.interest.repository.daos

import app.me.organize.interest.model.Interest
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import org.springframework.stereotype.Component

@Component
class InterestJsonFileDao: InterestDao {

    override fun findInterests(): List<Interest> {
        return readInterestsFromFile()
    }

    override fun findInterestById(id: String): Interest? {
        return  readInterestsFromFile().find {
            it.id == id
        }
    }

    override fun createInterest(interest: Interest): String {
        TODO("Cannot be implemented")
    }

    override fun modifyInterest(interest: Interest) {
        TODO("Cannot be implemented")
    }

    override fun deleteInterest(id: String) {
        TODO("Cannot be implemented")
    }

    private fun readInterestsFromFile(): List<Interest> {
        val fileContent = this::class.java.classLoader.getResource("interests.json")?.readText()
        return Gson().fromJson(fileContent, object : TypeToken<List<Interest>>() {}.type)
    }
}