import EditorLayout from "@/components/Layout";
import { useEffect, useReducer, useRef } from "react";
import Moveable, { OnDrag, OnResize } from 'react-moveable';
// import DragTarget from "./DragTarget";

type Position = {
  left: number;
  top: number;
  width: number;
  height: number;
  transform: string;
};

function EditorPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useReducer(
    (prev: Position, next: Partial<Position>) => ({
      ...prev,
      ...next,
    }),
    {
      left: 0,
      top: 0,
      width: 200,
      height: 50,
      transform: '',
    }
  );

  // useEffect(() => {
  //   let moveable: Moveable | null = null;
  //   console.log('moveable', moveable);
  //   if (targetRef.current && !moveable) {
  //     moveable = new Moveable(document.body, {
  //       target: targetRef.current,
  //       draggable: true,
  //       resizable: true,
  //     });

  //     moveable.on('drag', ({ left, top }: OnDrag) => {
  //       setPosition({ left, top });
  //     });

  //     moveable.on('resize', ({ delta, clientX, clientY, width, height, dist }: OnResize) => {
  //       console.log(delta, clientX, clientY, width, height, dist);
  //       delta[0] && setPosition({ width });
  //       delta[1] && setPosition({ height });
  //     });
  //   }
  // }, []);

  //   setPosition({ transform });
  // };

  const handleDrag = ({ left, top, transform }: OnDrag) => {
    console.log(left, top);
    // setPosition({ left, top, transform });
  };

  const handleResizing = ({ width, height, delta, clientX, clientY, direction, dist }: OnResize) => {
    console.log('direction', direction, clientX, clientY, width, height, dist);
    // delta[0] && setPosition({ width, top: clientX, left: clientY });
    // delta[1] && setPosition({ height, top: clientX, left: clientY });
  };

  return (
    <EditorLayout>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className="target" style={{ position: 'absolute', top: position.top, left: position.left, border: '1px solid #bdbdbd', width: position.width, height: position.height }} ref={targetRef}>
          Moveable!!
        </div>
      </div>
      <Moveable
        ref={e => { this.moveable = e; }}
        container={null}
        origin={true}
        edge
        resizable
        throttleDrag={0}
        draggable
        throttleResize={0}
        // scaleable
        onDrag={handleDrag}
        onResize={handleResizing}
      // onScale={handleScale}
      />

    </EditorLayout>
  );
}

export default EditorPage;
