# NodeFlux Software Engineer Intern Assessment

## VIP Management System Web Dashboard

A Web Dashboard (receptionist team as the end-user) that can get VIPs information using HTTP client requests and can visualize information on the dashboard.

## Getting Started

1.  Clone project, open your terminal and go to the project's folder.
2.  Install dependencies:
    ```bash
    npm i
    ```
3.  Run the api server. By default, it will run on port 3004. You can change it on _json-server.json_
    ```bash
    npm run json-server
    ```
4.  Modify environments on _config/index.js_ as needed.
5.  Run the app. By default, it will run on port 3000.
    ```bash
    npm run dev
    ```
6.  To test it, open http://localhost:3000/ on your browser
7.  To build into production, run these two commands
    ```bash
    npm run build;
    npm start
    ```