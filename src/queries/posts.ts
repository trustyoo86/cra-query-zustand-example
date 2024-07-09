export type Posts = {
  id: number;
  title: string;
}

export type PostList = Posts[]; 

export const getPostList = fetch('https://my-json-server.typicode.com/typicode/demo/posts', { method: 'get' }).then(res => res.json());