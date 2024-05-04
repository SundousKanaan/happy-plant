// user type
export type User = {
  id: number;
  userName: username;
  email: string;
  password: string;
  imageSrc: string;
  plants: Plant[];
  posts: Post[];
  followers: Follower[];
  following: Following[];
  savedPosts: Post[];
};

export type username = {
  firstName: string;
  lastName: string;
};

export type Plant = {
  id: number;
  name: string;
  plantFamily: string;
  imageSrc: string;
  position: plantPosition;
  background_imageSrc: string;
};

export type plantPosition = {
  x: string;
  y: string;
};

export type Post = {
  postId: number;
  plantId: number;
  userId: number;
  saved: boolean;
};

export type Follower = {
  userId: number;
};

export type Following = {
  userId: number;
};
