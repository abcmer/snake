# snake

Simple clone of the game snake. Control the snake with arrow keys to eat the food. Try not to eat yourself.

## Getting Started

These instructions will get you a copy of the game up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

- [Docker CE](https://docs.docker.com/install/)

### Installing

Clone this project

```
git clone https://github.com/abcmer/snake.git
```

Build the dev Docker image from the project root

```
docker build web -f web/Dockerfile.dev -t snake:dev
```

Run dev Docker container
```
docker run -d -p 3000:3000 snake:dev
```
Go to http://localhost:3000 to play the game!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

