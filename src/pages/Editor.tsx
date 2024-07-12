import EditorLayout from "@/components/Layout";
import { useReducer } from "react";
import DragTarget from "./DragTarget";

// type Position = {
//   left: number;
//   top: number;
//   width: number;
//   height: number;
//   transform?: string;
// };

type Element = {
  id: number;
};

function EditorPage() {
  const [element, setElement] = useReducer(
    (prev: Element[], next: Element[]) => ([
      ...prev,
      ...next,
    ]),
    []
  );

  const handleAddElement = () => {
    const len = element.length;
    console.log('element', element);
    setElement([{ id: len }]);

  };

  return (
    <EditorLayout>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <button style={{ position: 'absolute', left: '90%', top: 0 }} onClick={handleAddElement}>
          Moveable 추가
        </button>
        {
          element.map((el) => <DragTarget id={el.id} key={`moveable-${el.id}`} />)
        }
      </div>
    </EditorLayout>
  );
}

export default EditorPage;
