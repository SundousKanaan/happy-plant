export type UserName = {
  firstName: string;
  lastName: string;
};

export type PlantType = {
  id: number;
  databaseId: number;
  plantName: string;
  type: string;
  familyName: string;
  plantImage: string;
  backgroundImage: string;
  note: string;
  careInfo: careInfo;
  position: PlantPosition;
  birthday: string;
};

export type PlantPosition = {
  x: number;
  y: number;
};

export type careInfo = {
  Watering: string;
  amountOfWater: string;
  Light: string;
  Temperature: string;
  Poisoning: string;
  careLevel: string;
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

export type Award = {
  type: string;
  totalStars: number;
  imagesrc: string;
  win: boolean;
};

export type AccountType = {
  id: number;
  userName: UserName;
  email: string;
  password: string;
  stars: number;
  userImage: string;
  plants: PlantType[];
  posts: Post[];
  followers: Follower[];
  following: Following[];
  savedPosts: Post[];
  awards: Award;
};
