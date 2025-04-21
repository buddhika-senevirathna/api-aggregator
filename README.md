# API Aggregator
API Aggregator is a lightweight backend application built with Node.js, GraphQL, and TypeScript. It leverages PostgreSQL for data storage and runs in a Docker containerized environment. The application features sample implementations for integrating with external APIs such as GitHub and GitLab, showcasing its capability to aggregate data from multiple sources. Designed with scalability in mind, it can be easily extended to support additional endpoints. 

### Technologies
- Node.js, TypeScript
- GrpahQL
- PostgreSQL
- Prisma ORM
- Docker
- Jest

## 🔧 Prerequisites

Ensure you have the following installed:
Make sure you have Node.js, Docker, and PostgreSQL installed on your local machine. If not, you can set them up using the links below:
- Node.js - https://nodejs.org/en/download 
- PostgreSQL - https://www.postgresql.org/download/
- Docker - https://www.docker.com/

## 🚀 Setting Up Locally
- Clone or download the repository from GitHub.

- Move the application to your preferred folder.

- Run npm install to install dependencies.

- Rename the `.env.sample` file to `.env.

- Open the `.env` file and update it with your database credentials.

- Update the database connection and port details in `docker-compose.yaml`.

- Run the app using Docker `Docker compose up` or your preferred method.

### Testing locally
- Access the browser apollo graphql studio by using `http://localhost:13000/`
  (⚠️ Replace 13000 with your custom port if you updated it in docker-compose.yaml.)

- If you have postman (https://www.postman.com/) installed in your local environment you can use it or use online postman application if you are comfortable with it.

### Testing
## User Registration

Testing begins with creating a user.

This system does not require admin or super admin privileges. Any user can register using a **unique email address**.

You can create users using:

- **Postman**
- **Apollo Studio**
- **cURL**

### GraphQL Mutation

Use the following GraphQL mutation to create a user:

```graphql
mutation CreateUser {
  createUser(email: "<email of the user>", name: "<name of the user>") {
    id
    name
    email
  }
}
```

> Replace `<email of the user>` and `<name of the user>` with the actual values.

### cURL Command

Alternatively, use the `cURL` command below:

```bash
curl -X POST https://your-graphql-endpoint.com/ \
  -H "Content-Type: application/json" \
  -H "user-id: your-user-id-string" \
  -d '{
    "query": "mutation CreateUser { createUser(email: \"<email of the user>\", name: \"<name of the user>\") { id name email } }"
  }'
```

> Replace:
> - `https://your-graphql-endpoint.com/` with your actual GraphQL endpoint   
> - `<email of the user>` and `<name of the user>` with real values

### Response

A successful request will return the following:

```json
{
  "data": {
    "createUser": {
      "id": "generated-user-id",
      "name": "User Name",
      "email": "user@example.com"
    }
  }
}
```
## Generating Access Tokens

After creating a user, the next step is to generate credentials related to that user.  
To test GitHub or GitLab API endpoints, users must provide their **own personal access tokens**.

> ⚠️ There are no shared or common credentials available for testing GitHub or GitLab APIs.  
> Each user must use their **own GitHub or GitLab account** and generate personal access tokens.

### GitHub Access Token

To generate a GitHub personal access token:

1. Go to your GitHub account.
2. Navigate to **Settings** > **Developer settings** > **Personal access tokens**.
3. Follow the instructions to create a new token.

🔗 [Generate GitHub Access Token](https://github.com/settings/tokens)

### GitLab Access Token

To generate a GitLab personal access token:

1. Log in to your GitLab account.
2. Go to **User Settings** > **Access Tokens**.
3. Create a new token with the required scopes.

🔗 [Generate GitLab Access Token](https://gitlab.com/-/user_settings/personal_access_tokens)

> Make sure to save your token securely. You will use it when making authenticated API requests.

## Creating User Credentials with Access Tokens

After generating an access token, the next step is to create **user credentials** linked to that token.

To create credentials, you need the **user ID** returned during user registration.

### 🔍 Retrieving User ID (If Forgotten)

If you don't remember the user ID, you can retrieve it using the user's **unique email address**.

#### GraphQL Query

```graphql
query GetUserByEmail {
  getUserByEmail(email: "<user's email address>") {
    id
    name
    email
  }
}
```

> Replace `<user's email address>` with the email used during registration.

#### cURL Example

```bash
curl -X POST http://localhost:4000 \
  -H "Content-Type: application/json" \
  -H "user-id: your-user-id-string" \
  -d '{
    "query": "query GetUserByEmail { getUserByEmail(email: \"<user's email address>\") { id name email credentials { id provider credentials userId } } }"
  }'
```

> Replace:
> - `http://localhost:4000` with your GraphQL server endpoint
> - `user's email address` with the actual user’s email address

The response will return the user ID along with name, email, and any existing credentials.
## Adding User Credentials

Adding credentials for a user is essential.  
Without credentials, the user will not be able to access GitHub, GitLab, or any other integrated endpoints.

🔐 **Security Notice:**  
We guarantee the security of your access tokens. All tokens are stored in the system with **encryption**.

To add credentials for a user, use the following GraphQL mutation or `cURL` command.

### GraphQL Mutation

```graphql
mutation CreateUserWithCredentials {
  createUserWithCredentials(
    credentials: "ACCESS TOKEN"
    provider: "PROVIDER"
    userId: "USER ID"
  ) {
    id
    provider
    credentials
    userId
  }
}
```

> Replace:
> - `"GITHUB ACCESS TOKEN"` with your actual GitHub access token  
> - `"PROVIDER"` with `GITHUB` or `GITLAB`. In the future, if other services are supported, you can use the respective provider name.  
> - `"USER ID"` with the ID of the registered user  
> - `https://your-graphql-endpoint.com/` with your actual GraphQL server URL  
> - `your-user-id-string` with a valid user ID (if required in headers)

### cURL Command

```bash
curl -X POST https://your-graphql-endpoint.com/ \
  -H "Content-Type: application/json" \
  -H "user-id: your-user-id-string" \
  -d '{
    "query": "mutation CreateUserWithCredentials { createUserWithCredentials(credentials: \"GITHUB ACCESS TOKEN\", provider: \"GITHUB\", userId: \"USER ID\") { id provider credentials userId } }"
  }'
```

> Replace:
> - `"GITHUB ACCESS TOKEN"` with your actual GitHub access token  
> - `"PROVIDER"` with `GITHUB` or `GITLAB`. In the future, if other services are supported, you can use the respective provider name.  
> - `"USER ID"` with the ID of the registered user  
> - `https://your-graphql-endpoint.com/` with your actual GraphQL server URL  
> - `your-user-id-string` with a valid user ID (if required in headers)

## Ready for GitHub and GitLab Testing

Once the credentials are added, the user is ready to test GitHub and GitLab endpoints.

### ✅ Verifying Credentials

If you're unsure whether the user credentials were saved correctly, you can re-run the **Get User Details by Email** query to check.

> 🔒 Note: Credentials are stored in an encrypted format, so you will **not be able to view the original token value** in the response.

---

### GraphQL Query Example

```graphql
query GetUserByEmail {
  getUserByEmail(email: "<user's email address>") {
    id
    name
    email
    credentials {
      id
      provider
      credentials
      userId
    }
  }
}
```

> Replace `<user's email address>` with the email used during registration.

---

### cURL Command

```bash
curl -X POST https://your-graphql-endpoint.com/ \
  -H "Content-Type: application/json" \
  -H "user-id: your-user-id-string" \
  -d '{
    "query": "query GetUserByEmail { getUserByEmail(email: \"user@example.com\") { id name email credentials { id provider credentials userId } } }"
  }'
```

> Replace:
> - `https://your-graphql-endpoint.com/` with your actual GraphQL server endpoint  
> - `your-user-id-string` with a valid user ID (if required)  
> - `"user@example.com"` with the actual email address of the registered user

The response will include the user's details and any saved credentials in encrypted form.  
This allows you to confirm the data is stored correctly before proceeding with API testing.

## 🧪 Testing GitHub Endpoints

You can start testing GitHub endpoints once user credentials are successfully stored.

### 📁 Get List of GitHub Repositories

This query retrieves the list of repositories that belong to the authenticated GitHub user.

#### GraphQL Query

```graphql
query GetGitHubRepoList {
  getGitHubRepoList(number_of_repos: 10) {
    name
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-graphql-endpoint.com/ \
  -H "Content-Type: application/json" \
  -H "user-id: your-user-id-string" \
  -d '{
    "query": "query GetGitHubRepoList { getGitHubRepoList(number_of_repos: 10) { name } }"
  }'
```

> 🔁 **Important:**  
> Replace `your-user-id-string` with the actual user ID.  
> If the user ID is incorrect or missing, the system will not be able to find the associated credentials and you will receive a "user credentials not found" error.

### 🔍 Get the GitHub Repository ID by Name and Owner

To retrieve more details about a specific GitHub repository, you can use the repository name and its owner (username).  
You can take the repository name from the previous list of repositories.

#### GraphQL Query

```graphql
query GetGitHubRepositoryId {
  getGitHubRepositoryId(repository: "<repository name>", owner: "<GitHub owner's name>")
}
```

> Replace:
> - `<repository name>` with the actual name of the GitHub repository  
> - `<GitHub owner's name>` with the username or organization name that owns the repository

---

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "query GetGitHubRepositoryId { getGitHubRepositoryId(repository: \"<repository name>\", owner: \"<GitHub owner's name>\") }"
  }'
```

> 🔁 Replace:
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint  
> - `YOUR_USER_ID_HERE` with the user ID tied to GitHub credentials  
> - `<repository name>` and `<GitHub owner's name>` with the actual values

If the credentials are valid and the repository exists, this will return the repository ID.

### 🐞 Get the List of Issues for a Repository

You can retrieve a list of GitHub issues associated with a specific repository.  
This will return the issue `id`, `title`, and `url`.

If the repository has no issues, the response will contain an **empty array**.

---

#### GraphQL Query

```graphql
query GetGitHubIssues {
  getGitHubIssues(
    repository_name: "<name of the repository>"
    owner: "<owner's username>"
  ) {
    id
    title
    url
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "query GetGitHubIssues { getGitHubIssues(repository_name: \"<name of the repository>\", owner: \"<owner's username>\") { id title url } }"
  }'
```

> 🔁 **Replace the placeholders:**
> - `<name of the repository>` with the actual repository name  
> - `<owner's username>` with the GitHub username of the repository owner  
> - `YOUR_USER_ID_HERE` with the valid registered user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

If everything is set up correctly and the user has access, the query will return the list of issues.

### 📝 Create a GitHub Repository Issue

If the list of issues is empty, it might be time to create one!  
To create a GitHub issue, the user needs the **repository ID**.

You can retrieve the repository ID using the previously described  
**"Get the GitHub Repository ID by Name and Owner"** endpoint.

---

#### GraphQL Mutation

```graphql
mutation CreateGitHubIssue {
  createGitHubIssue(
    body: "<body of the issue>"
    title: "<Title of the issue>"
    repository_id: "<ID of the repository>"
  ) {
    id
    title
    url
  }
}
```

---

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "mutation CreateGitHubIssue { createGitHubIssue(body: \"<body of the issue>\", title: \"<Title of the issue>\", repository_id: \"<ID of the repository>\") { id title url } }"
  }'
```

---

> 🔁 **Replace the placeholders:**
> - `<body of the issue>` with the description/content of the issue  
> - `<Title of the issue>` with a meaningful title  
> - `<ID of the repository>` with the repository ID obtained earlier  
> - `YOUR_USER_ID_HERE` with the valid user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

Once the issue is created, you can verify it by running the `GetGitHubIssues` query again to see the newly created issue in the list.

### 🎉 React to a GitHub Issue

Users can add a reaction to any GitHub issue.  
GitHub supports the following list of reactions:

- 👍 `+1`
- 👎 `-1`
- 😄 `LAUGH`
- 🎉 `HOORAY`
- 😕 `CONFUSED`
- ❤️ `HEART`
- 🚀 `ROCKET`
- 👀 `EYES`

---

#### GraphQL Mutation

```graphql
mutation ReactGitHubIssue {
  reactGitHubIssue(
    reaction: "<reaction>"
    issue_id: "<Issue Id>"
  ) {
    id
    title
    url
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "mutation ReactGitHubIssue { reactGitHubIssue(reaction: \"<reaction>\", issue_id: \"<Issue Id>\") { id title url } }"
  }'
```

> 🔁 **Replace the placeholders:**
> - `<reaction>` with a valid GitHub reaction type from the list above  
> - `<Issue Id>` with the ID of the issue you want to react to  
> - `YOUR_USER_ID_HERE` with your registered user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

Now you can see your reaction inside your GitHub repository issue.

## 🧪 Testing GitLab Endpoints

Before proceeding, make sure you’ve created and stored valid **GitLab credentials** for the user.  
You can verify this using the user credential query as discussed earlier.

---

### 📁 Get GitLab Project List

This query fetches a list of GitLab projects associated with the authenticated user.  
You can specify the number of recent projects you want to retrieve.

#### GraphQL Query

```graphql
query GetGitLabProjectsList {
  getGitLabProjectsList(number_of_projects: <Number of projects>) {
    name
    fullPath
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "query GetGitLabProjectsList { getGitLabProjectsList(number_of_projects: <Number of projects>) { name fullPath } }"
  }'
```

> 🔁 **Replace the placeholders:**
> - `<Number of projects>` with the number of GitLab projects you want to retrieve  
> - `YOUR_USER_ID_HERE` with your registered user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

---
### 🐛 Get the List of GitLab Project Issues

Using the `project_path` value from the previous `GetGitLabProjectsList` query, you can now fetch the list of issues for a specific GitLab project.

---

#### GraphQL Query

```graphql
query GetGitLabProjectIssues {
  getGitLabProjectIssues(project_path: "<Project Path>") {
    id
    iid
    title
    description
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "query GetGitLabProjectIssues { getGitLabProjectIssues(project_path: \"<Project Path>\") { id iid title description } }"
  }'
```

> 🔁 **Replace the placeholders:**
> - `<Project Path>` with the full path of the GitLab project (e.g., `username/project-name`)  
> - `YOUR_USER_ID_HERE` with your registered user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

If there are no issues in the selected project, the response will return an empty array.


### 📝 Create GitLab Project Issue

You can create an issue in a GitLab project by providing the `title`, `description`, and `project_path` of the project.

---

#### GraphQL Mutation

```graphql
mutation CreateGitLabProjectIssue {
  createGitLabProjectIssue(
    description: "<issue description>"
    title: "<issue title>"
    project_path: "<project path>"
  ) {
    id
    iid
    title
    description
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "mutation CreateGitLabProjectIssue { createGitLabProjectIssue(description: \"<issue description>\", title: \"<issue title>\", project_path: \"<project path>\") { id iid title description } }"
  }'
```

> 🔁 **Replace the placeholders:**
> - `<issue description>` with the description of the issue you want to create  
> - `<issue title>` with the title of the issue  
> - `<project path>` with the full path of the GitLab project (e.g., `username/project-name`)  
> - `YOUR_USER_ID_HERE` with your registered user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

This mutation will create the issue and return the `id`, `iid`, `title`, and `description` of the created issue.


### 🔍 Get a Single GitLab Issue

To fetch detailed information about a specific GitLab issue, use the `iid` obtained from the `GetGitLabProjectIssues` query along with the project path.

---

#### GraphQL Query

```graphql
query GetGitLabProjectIssue {
  getGitLabProjectIssue(
    issue_id: "<Issue id (iid)>"
    project_path: "<project path>"
  ) {
    id
    iid
    title
    description
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "query GetGitLabProjectIssue { getGitLabProjectIssue(issue_id: \"<Issue id (iid)>\", project_path: \"<project path>\") { id iid title description } }"
  }'
```

> 🔁 **Replace the placeholders:**
> - `<Issue id (iid)>` with the issue IID retrieved earlier  
> - `<project path>` with the full path of the GitLab project (e.g., `username/project-name`)  
> - `YOUR_USER_ID_HERE` with your registered user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

This query will return more detailed information about the selected issue.

### 🎉 Award Emoji to GitLab Project Issue

Unlike GitHub, GitLab supports a variety of emojis that can be awarded to issues. You can find more about the available reactions [here](https://docs.gitlab.com/user/emoji_reactions/).

---

#### GraphQL Mutation

```graphql
mutation AwardEmojiToGitLabProjectIssue {
  awardEmojiToGitLabProjectIssue(award_emoji: "<emoji>", issue_id: <issue id>) {
    name
    description
    unicode
    emoji
    unicodeVersion
  }
}
```

#### cURL Command

```bash
curl -X POST https://your-api-endpoint/graphql \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID_HERE" \
  -d '{
    "query": "mutation AwardEmojiToGitLabProjectIssue { awardEmojiToGitLabProjectIssue(award_emoji: \"<emoji>\", issue_id: <issue id>) { name description unicode emoji unicodeVersion } }"
  }'
```

> 🔁 **Replace the placeholders:**
> - `<emoji>` with the emoji you want to award to the issue (e.g., `:thumbsup:`, `:tada:`, `:heart:`)  
> - `<issue id>` with the ID of the issue you want to react to  
> - `YOUR_USER_ID_HERE` with your registered user ID  
> - `https://your-api-endpoint/graphql` with your actual GraphQL endpoint

This mutation will return details about the awarded emoji, including its name, description, and unicode version.


## 🔍 Assumptions
- The project covers only a small subset of endpoints, and the selection of endpoints was done without a specific goal or target in mind.
- Prisma ORM is used to support multiple databases, allowing users to easily switch between different databases as needed.

---

## ⚡ Points to Improve
- **Auth Token Integration**: The system would benefit from implementing an authentication token concept to securely manage access and ensure proper user authorization for API calls.
- **Validation**: Some necessary validations are missing from the system due to time constraints. Adding proper input and data validation would improve system robustness and security.

