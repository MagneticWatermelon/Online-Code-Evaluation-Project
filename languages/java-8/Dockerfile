FROM openjdk:8
RUN  mkdir code-dir   
COPY ./src.java /code-dir
WORKDIR /code-dir
RUN javac ./src.java
CMD ["java", "src"]