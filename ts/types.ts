export type UserName = {
  firstName: string;
  lastName: string;
};

export type Plant = {
  id: number;
  name: string;
  plantFamily: string;
  imageSrc: string;
  position: PlantPosition;
  background_imageSrc: string;
};

export type PlantPosition = {
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

export type AccountType = {
  id: number;
  userName: UserName;
  email: string;
  password: string;
  imageSrc: string;
  plants: Plant[];
  posts: Post[];
  followers: Follower[];
  following: Following[];
  savedPosts: Post[];
};
