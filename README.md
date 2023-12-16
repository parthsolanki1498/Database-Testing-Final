# Project: persistence-service

## Goal

This project is implemented as Final Assignment for the subject Database Testing (SENG8070)
This project was imported from Gitlab to Github from professor's repository and consists of several branches
The branch that contains the final sumbission and we've worked upon is "postgres-orm"

## Getting started

### Requirements

Considering the project shared on the dropbox had node_moudles removed from it, one need to run
```bash
npm install
```
command to have the dependencies install and considering "npm build" fails, please run the following command
```bash
npm i @types/jest
```

#### Docker & docker-compose

---

The [official website](https://docs.docker.com/get-docker/) contains instructions
for all operating systems.

in most cases, compose (docker-compose) comes with the Docker installation.
However, if you're looking for a different version or troubleshooting tips, you
can head to the [official documentation for compose](https://docs.docker.com/compose/install/).

### Starting Development

Validate that you have Node and NPM:

```bash
node -v
```

```bash
npm -v
```

### Using docker compose

These commands are to be ran in the docker compose directory.

#### Build the Image

```bash
docker-compose build
```

#### Run the image

```bash
docker-compose up -d
```

#### Build and Run the image

```bash
docker-compose up -d --build
```

## CURL Request for Insertion and Deletion
---
Please use the following CURL Request to Insert or Delete for various entity class. Here's an example for Employee Table since that class has all the HTTP methods implemented - namely GET, POST, PUT, DELETE

Insertion
```curl
curl --location --request PUT 'http://localhost/employee' \
--header 'Content-Type: application/json' \
--data '{
    "name" : "Parth",
    "surname" : "Solanki",
    "seniority" : "Student",
    "mechanicalCertificationStatus" : "yes"
}'
```
---
Deletion
```curl
curl --location --request DELETE 'http://localhost/employee/1'
```
---
Update
```curl
curl --location --request PUT 'http://localhost/employee/1' \
--header 'Content-Type: application/json' \
--data '{
    "name" : "Parth",
    "surname" : "Solanki",
    "seniority" : "Updated Student",
    "mechanicalCertificationStatus" : "yes"
}'
```

