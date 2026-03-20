export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  colors: string[];
  tags: string[];
  description: string;
}

export interface UserPreference {
  liked: string[];
  disliked: string[];
  superLiked: string[];
}

export interface AvatarConfig {
  gender: "male" | "female" | "neutral";
  bodyType: "slim" | "regular" | "athletic" | "plus";
  skinTone: string;
  height: number;
}

export type SwipeDirection = "left" | "right" | "up";
