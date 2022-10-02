## About

### Description

F1 box is a hub and a platform for analysing Formula 1 data.
It goes back from the first F1 race in 1950 up to the most current one.
Features an in depth Race, Drivers, Constructors analytics and information,
as well as News and Press gathered from popular publishers.

### Build With

Next-Js, Supabase, Zustand, Tailwind.
Powered by [Ergast F1 API.](https://ergast.com/mrd/)

## Getting started

#### Note: project yet to be finished, this is for future use.

To set the exect project you'll need to setup [Supabase](https://supabase.com) with database image of [Ergast F1 API](https://ergast.com/mrd/),
I downloaded CSV image and uploaded in manually via supabase UI (to minimise the load on the API server).
However, the project setup so it can run only on Ergast F1 API.

### Prerequisites

NodeJs
* Check if NodeJs already installed on your machine
  ```sh
  $ node -v
  ```
* If not then install
  ```sh
  $ sudo apt install node-js npm
  $ sudo dnf install node-js
  $ sudo pacman -S node-js
  ```

### Installation

1. Clone the repo
   ```sh
   $ git clone https://github.com/ya-johnson/f1-box.git
   ```
2. Install NPM packages
   ```sh
   $ npm i
   ```
3. Create .env.local file
   ```sh
   $ touch .env
   ```
4. Set env variables
   ```
  NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
  NEXT_PUBLIC_API_URL=http://ergast.com/api/f1
   ```


