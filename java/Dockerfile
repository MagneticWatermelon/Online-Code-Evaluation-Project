FROM openjdk
RUN mkdir java-dir
COPY ./test.java /java-dir
WORKDIR /java-dir
RUN javac ./test.java
CMD ["java","test"]