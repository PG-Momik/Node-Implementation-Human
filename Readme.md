# Setup Guide

1. **Copy the repository**
    - Clone or download the repository to your local machine.
      ```bash
        git clone git@github.com:PG-Momik/Node-Implementation-Human.git
      ```

2. **Ensure Docker is installed**
    - Make sure you have Docker installed on your machine.

3. **Copy the environment file**
    - Copy `.env.example` to `.env`.
      ```bash
        cp .env.example .env
      ```

4. **Add token in `.env`**
    - In the `.env` file, add your Webz.io API token under the relevant variable. Example:
      ```env
      WEBZ_API_TOKEN=your-api-token-here
      ```

5. **Build and start the Docker containers**
    - Run the following command to build and start the containers:
      ```bash
      docker compose up --build
      ```
    - If you’ve already built the containers previously, you can simply use:
      ```bash
      docker compose up
      ```
    - This will run all migrations and everything you need to access the app's API.

6. **Access the APIs**
    - After the containers are running, you will have access to the following APIs:
    1. **`localhost:3000/`**: Returns basic app information.
    2. **`localhost:3000/api/posts`**: Fetches posts that are stored in the database, with pagination and the ability to filter by different fields. This api accepts query params similar to the ones that of Webz,io's News Lite API uses:
       - `q` (required): Keyword to search for in post titles.
       - `author`: Filter by post author.
       - `language`: Filter by language.
       - `sentiment`: Filter by sentiment of the post.
       - `ai_allow`: Boolean flag to filter AI-allowed posts.
       - `webz_reporter`: Boolean flag to filter posts reported by Webz.
       - `published`: Filter by published date (exact match).
       - `crawled`: Filter by crawled date (exact match).
       - Additionally, there is a `per_page` query param that changes how many results are returned. (default=20)
    3. **`localhost:3000/api/fetch-webz-posts`**: Triggers a call to the Webz.io API. For now, these are the only query params that can be passed to Web.io's News Lite APi:
       - `q`
       - `sort`
       - `order`
       - `sentiment`
       - `highlight`
       - `size`
---

# Things to Note

## 1. Custom NPM Script
- I created a custom npm command `script:fetch-webz-posts` that allows users to fetch data form the News Lite API via the command line.
  - I made this command because it was easier for me to test my code by running this command.
  - You can use it too.
  - Run the script using:
    ```bash
      npm run script:fetch-webz-posts
    ```
  - Syntax: 
    ```bash
      npm run script:fetch-webz-posts -- -q "AI in Education" --sentiment "negative" --sort_by "relevance
    ```
## 2. Can run test
- Written unit test for the service: `webzPostApiService`. This test can be run by using the script:
  ```bash
    npm test
  ```
  
## 3. Did Not Normalize Categories and Topics Fields
- Although categories and topics are predefined in the API response, they haven't been normalized in the current schema. 
- If normalization is needed in the future, consider the following structure:
   - `categories` (id, category_name)
   - `topics` (id, topic_name, category_id)
- Depending on how the API returns data: 

  |If categories and topics are optional or can appear independently |        If both are always present|
  |----|-----|
  | post_categories` (post_id, category_id) `post_topics` (post_id, topic_id)|A single linking table such as post_topics might suffice.|

---

# Remaining TODOs
- [ ] Add support for more query parameters as documented by the Webz.io API.
- [ ] Investigate why the 'from' parameter doesn't affect results, possibly being ignored by the API.
- [ ] Confirm whether 'moreResultsAvailable' decrements on subsequent requests or if it remains static.
- [ ] Use 'moreResultsAvailable' in a while loop to continue fetching results until no more remain.
- [ ] Ensure UUIDs are truly unique across multiple pages of results.
- [ ] Debug why `sleep(1000)` causes the app to crash and find a more stable delay method.
- [ ] Format UUIDs to the standard hyphenated 36-character format.
- [ ] Normalize categories and topics fields — both are predefined, so a lookup or separate table could be used for consistency.

---

# Project Structure
```
src
---
|-- builders
|   |-- WebzQueryBuilder.ts
|
|-- config
|   |-- database.ts
|
|-- controllers
|   |-- home.controller.ts
|   |-- post.controller.ts
|   |-- webzApi.controller.ts
|
|-- entities
|   |-- Post.ts
|
|-- middlewares
|
|-- migrations
|   |-- 1744588805810-CreatePostsTable.ts
|
|-- routes
|   |-- post.routes.ts
|   |-- webzApi.routes.ts
|
|-- scripts
|   |-- fetchWebzPosts.script.ts
|
|-- services
|   |-- post.service.ts
|   |-- webzPostApi.service.ts
|
|-- tests
|   |-- __fixtures__
|   |   |-- responseJson.json
|   |
|   |-- webzApiService.test.ts
|
|-- typeDef
|   |-- IWebzPost.ts
|   |-- IWebzPostResponse.ts
|   |-- IWebzQueryParams.ts
|   |-- WebzPost.ts
|
|-- utils
|   |-- logger.ts
|
|-- index.ts
```

# If things don't work out
- I know you can figure it out. Good luck!! :D 
