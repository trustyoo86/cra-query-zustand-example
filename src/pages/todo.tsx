import { useQuery } from "@tanstack/react-query";
import { getPostList, type PostList } from "queries/posts";
import { detectIncognito } from 'detectincognitojs';
import { useEffect, useState } from "react";
import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

function Todo() {
  const { isPending, isError, error, data } = useQuery<PostList>({ queryKey: ['postList'], queryFn: () => getPostList });
  const [isPrivate, setPrivate] = useState<boolean | null>(null);

  const detect = () => {
    detectIncognito().then(result => {
      setPrivate(result.isPrivate);
    });
  };

  useEffect(() => {
    detect();
  }, []);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>
  }

  return (
    <div>
      {
        isPrivate !== null && <p>isPrivate: {JSON.stringify(isPrivate)}</p>
      }
      <ul>
        {
          data.map(post => <li key={post.id}>{post.title}</li>)
        }
      </ul>
    </div>
  );
}

export default Todo;
