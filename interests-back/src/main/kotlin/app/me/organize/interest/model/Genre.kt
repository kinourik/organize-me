package app.me.organize.interest.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Genre(@Id val name: String)
