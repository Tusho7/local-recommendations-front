export interface RecommendationProps {
  id: string;
  name: string;
  review: string;
  address: string;
  phoneNumber: string;
  website: string;
}

export interface RecommendationData {
  name: string;
  review: string;
  address: string;
  phoneNumber: string;
  website: string;
  categoryId: string | undefined;
  userId: string | number;
}
