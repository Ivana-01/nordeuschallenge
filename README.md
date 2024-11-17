# Nordeus challenge

This project is a **Football Manager** simulator where users can input their **User ID** and receive a statistical display of their session, matches, points, and other game stats like daily active users, top users, etc. The project provides visualizations of user progress and performance on a daily basis.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

To run this project, you’ll need the following tools installed:

- **Node.js** - To run the application (installation guide can be found [here](https://nodejs.org/)).
- **MongoDB** (if you're using MongoDB as your database) - Download and install [MongoDB](https://www.mongodb.com/try/download/community).

### Installation

Follow these steps to set up the project locally:

1. Clone the repository from GitHub:
    ```bash
    git clone https://github.com/Ivana-01/nordeuschallenge.git
    ```

2. Navigate to the project directory:
    ```bash
    cd nordeuschallenge
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Start the local server:
    ```bash
    npm start
    ```

After this, the app will be available at `http://localhost:3000` (or another address depending on your configuration).

## Usage

Once you log in, you can enter your **User ID** and get the following statistics:

- **User ID**
- **User country**
- **Registration time**
- **Last login**
- **Session**
- **Time in game**
- **Match time**
- **Points**
- **Game stats**
- **Daily active users**
- **Total and average number of sessions**
- **Top user with points**

### How Users Can Enter Their User ID:

1. On the homepage, enter your **User ID** in the provided input field.
2. Click the **Submit** button.
3. The application will display detailed statistics based on your User ID.

## Testing

If you want to test the app, use the following commands:

1. Run the tests:
    ```bash
    npm test
    ```

Tests are written to validate all the basic functionalities of the app, such as entering a user ID and generating stats.

## Contributing

If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes:
    ```bash
    git checkout -b new-feature
    ```
3. Add your changes and commit them:
    ```bash
    git commit -am 'Added a new feature'
    ```
4. Push your changes to the branch:
    ```bash
    git push origin new-feature
    ```
5. Open a pull request with your changes.

## Author
- Ivana Stojadinović - Author of the project

