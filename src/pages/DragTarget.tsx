import { MouseEventHandler, useReducer, useState } from "react";
import Moveable, { OnDrag, OnResize } from 'react-moveable';

// type Props = {
//   ref: RefObject<HTMLDivElement>;
// };

type Position = {
  left: number;
  top: number;
  width: number;
  height: number;
  transform?: string;
};

type TargetProps = {
  id: number;
};

function DragTarget({ id }: TargetProps) {
  const [target, setTarget] = useState<EventTarget | null>(null);
  const [elOptions, setElOptions] = useReducer(
    (prev: Position, next: Partial<Position>) => ({
      ...prev,
      ...next,
    }),
    {
      left: 0,
      top: 0,
      width: 200,
      height: 50,
    }
  );

  const handleMouseDown: MouseEventHandler = (e) => {
    const nativeEvent = e.nativeEvent;

    setTarget(() => nativeEvent.target);
  };

  const handleDrag = ({ transform }: OnDrag) => {
    // setElOptions({ left, top, transform });
    setElOptions({ transform });
  };

  const handleResizing = ({ width, height, dist, transform }: OnResize) => {
    console.log('direction', elOptions.left, elOptions.top, dist);
    setElOptions({ width, height, transform });
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        id={`moveable-${id}`}
        key={`moveable-${id}`}
        className={`target moveable-${id}`}
        style={{
          position: 'absolute',
          width: elOptions.width,
          height: elOptions.height,
          left: elOptions.left,
          top: elOptions.top,
          transform: elOptions.transform,
          border: '1px solid #bdbdbd',
        }}>Moveable {id}</div>
      <Moveable
        target={target as HTMLElement}
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
    </>
  );
}

export default DragTarget;
