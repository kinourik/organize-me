FROM openjdk:11
WORKDIR /usr/app
COPY --chown=gradle:gradle . /usr/app
RUN /usr/app/gradlew build
RUN mv /usr/app/build/libs/interest-back-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]