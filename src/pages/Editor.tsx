import EditorLayout from "@/components/Layout";
// import { useReducer } from "react";
import DragTarget from "./DragTarget";
import { useElementStore } from "@/stores/element";
import Guides from "@scena/react-guides";

// type Position = {
//   left: number;
//   top: number;
//   width: number;
//   height: number;
//   transform?: string;
// };


function EditorPage() {
  const { elements, add } = useElementStore();

  /** @note use reducer */
  // type Element = {
  //   id: number;
  // };
  // const [element, setElement] = useReducer(
  //   (prev: Element[], next: Element[]) => ([
  //     ...prev,
  //     ...next,
  //   ]),
  //   []
  // );

  /** @note use reducer */
  // const handleAddElement = () => {
  //   const len = element.length;
  //   console.log('element', element);
  //   setElement([{ id: len }]);

  // };

  const handleAddElement = () => {
    add();
  };

  return (
    <EditorLayout>
      <Guides type="horizontal" style={{ height: 30 }} />
      <Guides type="vertical" style={{ width: 30 }} />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <button style={{ position: 'absolute', left: '90%', top: 0 }} onClick={handleAddElement}>
          Moveable 추가
        </button>
        {/* <div id="guideline" style={{ width: '50%', height: '50%', border: '1px solid #bdbdbd' }} /> */}
        {
          elements.map((el) => <DragTarget id={el.id} key={`moveable-${el.id}`} elements={elements} />)
        }
      </div>
    </EditorLayout>
  );
}

export default EditorPage;
