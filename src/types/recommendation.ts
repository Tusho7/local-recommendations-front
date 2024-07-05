export interface RecommendationProps {
  id: string;
  name: string;
  review: string;
  address: string;
  phoneNumber: string;
  website: string;
  User: {
    firstName: string;
    lastName: string;
  };
  Category: {
    name: string;
  };
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

export interface RecommendationPropsForProfile {
  id: number;
  name: string;
  review: string;
  address: string;
  phoneNumber: string;
  website: string;
  User: {
    firstName: string;
    lastName: string;
  };
  Category: {
    name: string;
  };
}
