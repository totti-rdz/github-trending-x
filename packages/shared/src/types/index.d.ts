export type Repo = {
  id: number;
  owner: string;
  title: string;
  description: string;
  stars: number;
  forks: number;
  link: string | undefined;
  ownerImgSrc: string | undefined;
};

export type Developer = {
  avatarImgSrc: string | undefined;
  company: string;
  dateJoined?: string;
  link: string | undefined;
  id: number;
  name: string;
  popularRepo: {
    title: string;
    description?: string;
    link?: string;
  };
  userName: string;
};

export type Language = { label: string; value: string };
