package app.me.organize

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class OrganizeApplication

fun main(args: Array<String>) {
	runApplication<OrganizeApplication>(*args)
}
