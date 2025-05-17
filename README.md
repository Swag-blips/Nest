# 🚀 Nest Blog API: Share Your Thoughts with the World! 🌍

A powerful and flexible backend API built with NestJS for creating and managing blog posts and comments. Dive into a world of seamless content creation and interaction! ✨

## 🛠️ Installation

Get the project up and running locally with these easy steps:

- ⬇️ **Clone the Repository**:
  ```bash
  git clone https://github.com/Swag-blips/Nest.git
  ```

- 📦 **Install Dependencies**:
  ```bash
  npm install
  ```

- ⚙️ **Configure Environment Variables**:
  - Create a `.env` file in the root directory.
  - Add the following variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=3000
    ```

- ▶️ **Run the Application**:
  ```bash
  npm run start:dev
  ```

## 📖 Usage

### Register a new user
Endpoint: `/auth/signup`
```ts
  @ApiCreatedResponse({ type: SignUpResponseDto })
  @Post('signup')
  async signup(@Body() userdto: createUserDto) {
    const user = await this.authService.register(userdto);

    return { success: true, user: user };
  }
```

### Login an existing user
Endpoint: `/auth/login`
```ts
 @Post('login')
  @ApiCreatedResponse({ type: LoginResponseDto })
  async login(@Body() userDto: loginUserDto) {
    const user = await this.authService.loginUser(userDto);

    return user;
  }
```

### Get user's profile (me)
Endpoint: `/auth/me`
```ts
@ApiBearerAuth()
  @ApiCreatedResponse({ type: GetMeResponse })
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const user = await this.authService.getMe(req.userId);

    return user;
  }
```

### Create a post
Endpoint: `/post`
```ts
@ApiBearerAuth()
  @ApiResponse({
    status: 201,
  })
  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() postDto: createPostDto, @Request() req) {
    const post = await this.postService.createPost(postDto, req.userId);
    return post;
  }
```

### Get all the posts
Endpoint: `/post`
```ts
@Get()
  async getPosts() {
    const posts = await this.postService.getPosts();
    return posts;
  }
```

### Get a post by id
Endpoint: `/post/:id`
```ts
@ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getPostById(@Param('id') id: mongoose.Types.ObjectId) {
    const post = await this.postService.getPostbyId(id);
    return post;
  }
```

### Delete a post
Endpoint: `/post/:id`
```ts
@ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: mongoose.Types.ObjectId, @Request() req) {
    const post = await this.postService.deletePost(id, req.userId);

    return post;
  }
```

### Update a post
Endpoint: `/post/:id`
```ts
@ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePost(
    @Body() updatePostDto: updatePostDto,
    @Param('id') id: mongoose.Types.ObjectId,
    @Request() req,
  ) {
    const updatedPost = await this.postService.editPost(
      updatePostDto,
      id,
      req.userId,
    );
    return updatedPost;
  }
```

### Get all posts of a user
Endpoint: `/post/user`
```ts
@ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user')
  async getUserPosts(@Request() req) {
    const userposts = this.postService.getUserPosts(req.userId);

    return userposts;
  }
```

### Create a comment for a post
Endpoint: `/comment/:id`
```ts
@UseGuards(AuthGuard)
  @Post(':id')
  async createComment(
    @Param('id') id: mongoose.Types.ObjectId,
    @Request() req,
    @Body() createCommentDto: createCommentDto,
  ) {
    const comment = this.commentService.createComment(
      createCommentDto,
      id,
      req.userId,
    );

    return comment;
  }
```

### Get all comments of a user
Endpoint: `/comment`
```ts
@UseGuards(AuthGuard)
  @Get()
  async getCommentsByUser(@Request() req) {
    const comments = await this.commentService.getCommentsByUser(req.userId);

    return comments;
  }
```

## ✨ Features

- ✍️ **Create Posts**: Easily create and manage blog posts with titles and content.
- 💬 **Comment System**: Engage with other users through a robust comment system.
- 🔐 **Authentication**: Secure user authentication with JWT.
- 🚀 **RESTful API**: Follows RESTful API principles for easy integration.
- 🛡️ **Authorization**: Secures access to resources using role-based authorization.
- 📝 **Validation**: Utilizes class-validator for robust data validation.
- 📚 **Swagger Documentation**: Provides comprehensive API documentation using Swagger.

## 💻 Technologies Used

| Technology   | Link                               |
| :----------- | :--------------------------------- |
| TypeScript   | [TypeScript](https://www.typescriptlang.org/) |
| NestJS       | [NestJS](https://nestjs.com/)       |
| MongoDB      | [MongoDB](https://www.mongodb.com/) |
| Mongoose     | [Mongoose](https://mongoosejs.com/) |
| JWT          | [JWT](https://jwt.io/)             |
| Swagger      | [Swagger](https://swagger.io/)       |
| Bcrypt       | [Bcrypt](https://www.npmjs.com/package/bcryptjs) |

## 🤝 Contributing

Contributions are always welcome! Here's how you can contribute:

- 🐛 **Report Bugs**: Help us squash those pesky bugs!
- 💡 **Suggest Features**: Got a great idea? We're all ears!
- ✍️ **Submit Pull Requests**: Contribute code and improve the project!

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Author Info

- GitHub: [GitHub Profile](https://github.com/your-github-profile)
- Twitter: [Twitter Profile](https://twitter.com/your-twitter-handle)
- LinkedIn: [LinkedIn Profile](https://linkedin.com/in/your-linkedin-profile)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
