export interface PostListProps {
  id: string;
  properties: PostProps;
}

export interface PostProps {
  id?: string;
  title: string;
  category: string[];
  coverImage?: string;
  post_id?: string;
  likes?: string[];
  img?: string[];
  createdTime: string;
}

export interface CategoryProps {
  id: string;
  name: string;
  count: number;
}

export interface CategoryResponse {
  categorys: CategoryProps[];
}

export interface BlogUploadProps {
  title: string;
  category: string;
  content: string;
}

export interface PostFormState {
  message?: string;
  errors?: {
    title?: string[];
    category?: string[];
    content?: string[];
  };
  success?: boolean;
  redirect?: boolean;
}

export interface ParameterProps {
  category?: string;
}
